import {
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Modal,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import {Link} from "react-router-dom";
import Header from "components/Headers/Header";
import React ,{Fragment}from "react";
import api from "services/api";
import StylishLoader from "../tools/StylishLoader";


class ListeMarque extends React.Component {

state = {
  defaultModal: false,
  marques: [],
  pays: [],
  //insertion
  libelle:null,
  idpays:null,
  erreur:null,
  loading:true,
  submitting:false
};
toggleModal = state => {
  this.setState({
    [state]: !this.state[state]
  });
};

getData = async () =>{
  try {
    const paysObj = await api.get('/admin/pays');
    const marque = await api.get('/admin/marque');
    this.setState({ marques: marque.data.data }, () => {
      console.log("State after setting:", marque);
    });
    this.setState({ pays: paysObj.data.data }, () => {
      console.log("Countries state after setting:", marque);
    });

    this.setState({ loading: false });

  } catch (error) {
    console.error('erreur',error);
    this.setState({ loading: false });
  }
}

delete = async (id) => {
  try {
    this.setState({ loading: true });
    await api.delete(`/admin/marque/${id}`);
    this.getData();
  } catch (error) {
    console.error('erreur',error);
  } finally {
    this.setState({ loading: false });
  }
}

handleSubmit = async (e) => {
  e.preventDefault();
  const { libelle,idpays } = this.state;
  const pays = {
    id : idpays
  };
  try {
    this.setState({ submitting: true });
    const response = await api.post('/admin/marque', {
      libelle,
      pays,
      etat:1
    });
    console.log('AJOUTER', response);
    this.getData();
    this.toggleModal("defaultModal");

  } catch (error) {
    console.error('Erreur', error.response.data.error);
    this.setState({ erreur: error.response.data.error });
  } finally {
    this.setState({ submitting: false })
  }
}

// AJOUTER CARBURANT
handleInputChange = (e) => {
  this.setState({[e.target.name]:e.target.value});
}


componentDidMount() {
  this.getData();
};


render(){
  const { marques } = this.state;
  const { pays } = this.state;
  const { erreur } = this.state;
  const { loading } = this.state;
  const {submitting} = this.state;

  return (
    <>
    {/* MODAL AJOUTER MARQUE */}
      <Modal className="modal-dialog-centered" isOpen={this.state.defaultModal} toggle={() => this.toggleModal("defaultModal")}>
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title-default">
              Ajouter marque
            </h3>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form role="form" onSubmit={this.handleSubmit}>
            <div className="modal-body">
                {erreur ? (
                    <div className="alert alert-danger">
                        {erreur}
                    </div>) : (<span></span>)
                }
                <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="nom">Nom</label>
                    <Input placeholder="Ecrire ici" type="text" id="nom" name="libelle" onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label className="form-control-label" htmlFor="idpays">Pays</label>
                  <Input type="select" id="idpays" name="idpays" onChange={this.handleInputChange}>
                    <option value="">Sélectionner</option>
                    {pays.map((ctr, index) => (
                      <option key={index} value={ctr.id}>{ctr.libelle}</option>
                    ))}
                    
                  </Input>
                </FormGroup>

            </div>
            <div className="modal-footer">
              <Button color="primary" type="submit">
                {submitting && <StylishLoader />}
                {!submitting && 'Ajouter'}
              </Button>
              <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
                Fermer
              </Button>
            </div>
          </Form>
      </Modal>

      <Header />

      {/* listeMarque */}
      <Container className="mt--9" fluid>
          <Button className="mt-2" color="primary" type="button" onClick={() => this.toggleModal("defaultModal")}>
            Ajouter
          </Button>
        {/* <Link to="/admin/ajoutMarque">
            <Button className="mt-2" color="primary" type="button">Ajouter</Button>
        </Link> */}
        <Row className="mt-3">
          <div className="col-md-6">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Marque</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Pays</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <StylishLoader />
                        </td>
                      </tr>
                    )}
                    {!loading && (
                    <React.Fragment key={1}>
                      {marques.map((marque, index) => (
                        <React.Fragment key={index}>
                        <tr>
                          <td>{marque.libelle}</td>
                          <td>{marque.pays.libelle}</td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <Link to={`/admin/modifierMarque/${marque.id}`}>
                                  <DropdownItem>
                                    Modifier
                                  </DropdownItem>
                                </Link>
                                <DropdownItem onClick={() => this.delete(marque.id)}>
                                  Supprimer
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                        </React.Fragment>
                        ))}
                      </React.Fragment>
                    )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
  }
}

export default ListeMarque;

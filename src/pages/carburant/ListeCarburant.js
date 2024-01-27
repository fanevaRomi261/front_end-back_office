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
import { Link } from "react-router-dom";
import Header from "components/Headers/Header";
import React, { Component } from "react";
import api from "services/api";
import StylishLoader from "../tools/StylishLoader";

class ListeCarburant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      libelle: '',
      successMessage: null,
      errorMessage: null,
      loading:true,
      submitting:false
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { libelle } = this.state;
    try {
      this.setState({ submitting: true });
      const response = await api.post('/carburant/', {
        libelle,
      });
      console.log('AJOUTER', response);
      this.setState({ successMessage: 'Type de carburant ajoute', errorMessage: null });
      this.fetchData();

    } catch (error) {
      console.error('Erreur', error);
      this.setState({ errorMessage: 'Une erreur s\'est produite', successMessage: null })
    } finally {
      this.setState({ submitting: false });
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const response = await api.get('/carburant/');
      this.setState({ data: response.data.data });
      this.setState({ loading: false });
    } catch (error) {
      console.error('une erreur ', error);
      this.setState({ error: 'Error' });
      this.setState({ loading: false });
    }
  }
  state = {
    exampleModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleDelete = async (id) => {
    try {
      this.setState({ loading: true });
      await api.delete(`/carburant/${id}`);
      this.fetchData();
    } catch (error) {
      console.error('erreur',error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, libelle, successMessage, errorMessage } = this.state;
    const { loading } = this.state;
    const {submitting} = this.state;
    return (
      <>
        {/* MODAL AJOUTER MARQUE */}
        <Modal className="modal-dialog-centered" isOpen={this.state.defaultModal} toggle={() => this.toggleModal("defaultModal")}>
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title-default">
              Ajouter un type de carburant
            </h3>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {errorMessage ? (<div className="alert alert-danger" > {errorMessage} </div>) : (
              <span></span>
            )}
            {successMessage ? (<div className="alert alert-success" > {successMessage} </div>) : (
              <span></span>
            )}

            <Form role="form" onSubmit={this.handleSubmit} >

              <FormGroup className="mb-3">
                <label className="form-control-label" htmlFor="libelle">Nom</label>
                <Input placeholder="Ecrire ici" type="text" name="libelle" id="libelle" value={libelle} onChange={this.handleChange} />
              </FormGroup>

              <Button color="primary" type="submit">
                {submitting && <StylishLoader />}
                {!submitting && 'Ajouter'}
              </Button>
            </Form>

          </div>
          <div className="modal-footer">
            <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
              Fermer
            </Button>
          </div>
        </Modal >

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
              <Card className=" shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="mb-0">Type de carburant</h3>
                </CardHeader>
                <Table
                  className="align-items-center  table-flush"
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Libelle</th>
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

                        { data.map((item) => 
                          (
                            <tr key={item.id}>
                              <td >{item.libelle}</td>
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
                                    <Link to={`/admin/modifierCarburant/${item.id}`}>
                                      <DropdownItem>
                                        Modifier
                                      </DropdownItem>
                                    </Link>
                                    <DropdownItem onClick={() => this.handleDelete(item.id)}>
                                      Supprimer
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>))
                        
                        }
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

export default ListeCarburant;

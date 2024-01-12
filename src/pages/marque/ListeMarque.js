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
import React from "react";

class ListeMarque extends React.Component {

  state = {
    exampleModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render(){
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
            <div className="modal-body">
              <Form role="form">
                
                <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="nom">Nom</label>
                    <Input placeholder="Ecrire ici" type="text" id="nom"/>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label className="form-control-label" htmlFor="idpays">Pays</label>
                  <Input type="select" id="idpays">
                    <option value="">Sélectionner</option>
                    <option value="option1">France</option>
                    <option value="option2">US</option>
                    <option value="option3">Allemagne</option>
                  </Input>
                </FormGroup>

              </Form>
            </div>
            <div className="modal-footer">
              <Button color="primary" type="button">
                Ajouter
              </Button>
              <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
                Fermer
              </Button>
            </div>
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
                    <tr>
                      <td>Mercedes</td>
                      <td>Allemagne</td>
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
                            <Link to="/admin/modifierMarque">
                              <DropdownItem>
                                Modifier
                              </DropdownItem>
                            </Link>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Supprimer
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>Mercedes</td>
                      <td>Allemagne</td>
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
                            <Link to="/admin/modifierMarque">
                              <DropdownItem>
                                Modifier
                              </DropdownItem>
                            </Link>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Supprimer
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
            
                    
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

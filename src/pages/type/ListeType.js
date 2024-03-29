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
import React ,{Fragment, useState,useEffect }from "react";
import api from "services/api";
import StylishLoader from "../tools/StylishLoader";

const ListeType = () => {

    const [defaultModal,setDefaultModal] = useState(false);
    const [listeType,setListeType] = useState([]);
    const [erreur,setErreur] = useState(null);
    const [loading,setLoading] = useState(true);
    const [submitting,setSubmitting] = useState(false); 

    const initialValue = {
        libelle : null,
        etat : 1
    };
    const [typeToInsert,setTypeToInsert] = useState(initialValue);

    const toggleModal = () => {
        setDefaultModal(!defaultModal);
    };

    const getType = async () =>{
        try {
            const typeObj = await api.get('/type');

            const sortedType = typeObj.data.data.sort((a, b) => b.id - a.id);
            setListeType(sortedType);
            // setListePays(paysObj.data.data);
            setLoading(false);
        } catch (error) {
            console.error('erreur',error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getType();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post('/type', typeToInsert);
            getType();
            toggleModal();
        } catch (error) {
            console.error('Erreur', error.response.data.error);
            setErreur(error.response.data.error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTypeToInsert({
            ...typeToInsert,
            [name]: value,
        }); 
    };

    
    const suppr = async (id) => {
        try {
            setLoading(true);
            await api.delete(`/type/${id}`);
            getType();
        } catch (error) {
            console.error('erreur',error);
        } finally {
            setLoading(false);
        }
    };
      
    return (
        <>
        {/* MODAL AJOUTER TYPE */}
        <Modal className="modal-dialog-centered" isOpen={defaultModal} toggle={toggleModal}>
            <div className="modal-header">
                <h3 className="modal-title" id="modal-title-default">
                    Ajouter type
                </h3>
                <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggleModal}>
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
                <div className="modal-body">
                {erreur ? (
                    <div className="alert alert-danger">
                        {erreur}
                    </div>) : (<span></span>)
                }
                    
                    <FormGroup className="mb-3">
                        <label className="form-control-label" htmlFor="nom">Nom</label>
                        <Input placeholder="Ecrire ici" type="text" id="nom" name="libelle" onChange={handleInputChange}/>
                    </FormGroup>

                </div>
                <div className="modal-footer">
                <Button color="primary" type="submit">
                    {submitting && <StylishLoader />}
                    {!submitting && 'Ajouter'}
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleModal}>
                    Fermer
                </Button>
                </div>
            </Form>
        </Modal>

        <Header />

        {/* listePays */}
        <Container className="mt--9" fluid>
            <Button className="mt-2" color="primary" type="button" onClick={toggleModal}>
                Ajouter
            </Button>
 
            <Row className="mt-3">
            <div className="col-md-6">
                <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">Type</h3>
                    
                </CardHeader>
                <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                >
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nom</th>
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
                    
                        {listeType?.map((liste, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td>{liste.libelle}</td>
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
                                <Link to={`/admin/modifierType/${liste.id}`}>
                                    <DropdownItem>
                                        Modifier
                                    </DropdownItem>
                                </Link>
                                <DropdownItem onClick={() => suppr(liste.id)}>
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

export default ListeType;

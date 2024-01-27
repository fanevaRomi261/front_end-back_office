import {
    Card,
    CardHeader,
    Button,
    Table,
    Container,
    Row,
    Form,
    Modal,
    Input,
    FormGroup,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "components/Headers/Header";
import React from "react";
import api from "services/api";
import StylishLoader from "../tools/StylishLoader";

class ListeCommission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            successMessage: '',
            errorMessage: '',
            min: '',
            max: '',
            valeur: '',
            loading:true,
            submitting:false
        };
    }


    fetchData = async () => {
        try {
            const response = await api.get('/admin/commission/');
            this.setState({ data: response.data.data });
            console.log(response);
            this.setState({ loading: false });
        } catch (error) {
            console.error('une erreur ', error);
            this.setState({ error: 'Error' });
            this.setState({ loading: false });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { min, max, valeur } = this.state;
        try {
            this.setState({ submitting: true });
            const response = await api.post('/admin/commission/', {
                min, max, valeur
            });
            console.log('AJOUTER', response);
            this.setState({ successMessage: 'Commission ajoute', errorMessage: null });
            this.fetchData();
            this.toggleModal("defaultModal")
        } catch (error) {
            console.error('Erreur', error);
            this.setState({ errorMessage: error.response.data.error, successMessage: null })
        } finally {
            this.setState({ submitting: false });
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleDelete = async (id) => {
        try {
            this.setState({ loading: true });
            await api.delete(`/admin/commission/${id}`);
            this.fetchData();
        } catch (error) {
          console.error('erreur',error);
        } finally {
            this.setState({ loading: false });
        }
      }

    render() {
        const { data, min, max, valeur, errorMessage } = this.state;
        const { loading } = this.state;
        const {submitting} = this.state;
        return (
            <>
                {/* MODAL AJOUTER MARQUE */}
                <Modal className="modal-dialog-centered" isOpen={this.state.defaultModal} toggle={() => this.toggleModal("defaultModal")}>
                    <div className="modal-header">
                        <h3 className="modal-title" id="modal-title-default">
                            Ajouter un nouveau commission
                        </h3>
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleModal("defaultModal")}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {errorMessage ? (<div className="alert alert-danger" > {errorMessage} </div>) : (
                            <span></span>
                        )}

                        <Form role="form" onSubmit={this.handleSubmit}  >

                            <FormGroup className="mb-3">
                                <label className="form-control-label" htmlFor="min"> Prix </label>
                                <Input className="mb-2" placeholder="min value" type="text" name="min" id="min" value={min} onChange={this.handleChange} />
                                <Input placeholder="max value" type="text" name="max" id="max" value={max} onChange={this.handleChange} />
                                <label className="form-control-label" htmlFor="valeur"> Valeur  %</label>
                                <Input placeholder="valeur" type="number" name="valeur" id="valeur" value={valeur} onChange={this.handleChange} />
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
                    <Row className="mt-3">
                        <div className="col-md-12">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Commission</h3>
                                </CardHeader>
                                <Table
                                    className="align-items-center table-dark table-flush"
                                    responsive
                                >
                                    <thead className="thead-dark">
                                        <tr className="text-center">
                                            <th scope="col">Min </th>
                                            <th scope="col">Max </th>
                                            <th scope="col">Valeur %</th>

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
                                            {data.map((item) =>
                                                <tr key={item.id} className="text-right">
                                                    <td> {item.min.toLocaleString()} </td>
                                                    <td> {item.max.toLocaleString()} </td>
                                                    <td >{item.valeur}</td>
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
                                                                <Link to={`/admin/modifierCommission/${item.id}`}>
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

                                                </tr>
                                            )}
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

export default ListeCommission;

import Header from "components/Headers/Header";
import React from "react";
import { Link } from "react-router-dom";
import 
{
    Form,
    Container,
    FormGroup,
    Input,
    Card,
    CardHeader,
    CardBody,
    Button,
    Row,
} from 'reactstrap';

const ModifierMarque =()=>{
        return(
            <>
                <Header/>
                <Container className="mt--9" fluid>
                    <Link to="/admin/listeMarque">
                        <Button className="mt-2" color="danger" type="button">
                        Retour
                        </Button>
                    </Link>
                    <Row className="mt-3">
                        <div className="mt-3 col-md-6">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Marque</h3>
                                </CardHeader>

                                <CardBody className="bg-transparent border-0">
                                    <Form role="form">
                                        <FormGroup className="mb-3">
                                            <label className="form-control-label text-white" htmlFor="nom">Nom</label>
                                            <Input placeholder="Ecrire ici" type="text" id="nom"/>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <label className="form-control-label text-white" htmlFor="idpays">Pays</label>
                                            <Input type="select" id="idpays">
                                                <option value="">Sélectionner</option>
                                                <option value="option1">France</option>
                                                <option value="option2">US</option>
                                                <option value="option3">Allemagne</option>
                                            </Input>
                                        </FormGroup>
                                    </Form>
                                    <Button type="button" color="primary">Valider</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    
};

export default ModifierMarque;
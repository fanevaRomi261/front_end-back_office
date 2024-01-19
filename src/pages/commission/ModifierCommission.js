import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
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
import api from "services/api";

const ModifierCommission = () => {
    const id = useParams().id;
    
    const [valeur, setValeur] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/admin/commission/${id}`);
                console.log(response);
                setValeur(response.data.data.valeur);
                setMin(response.data.data.min);
                setMax(response.data.data.max);
            } catch (error) {
                console.error('Erreur', error);
            }
        };
        fetchData();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`admin/commission/${id}`, {
                min,max,valeur
            });
            window.location.replace('/admin/listeCommission')
        } catch (error) {
            console.error('error', error)
            setErreur(error.response.data.error);
            console.log('error text', error);
        }
    }

    return (
        <>
            <Header />
            <Container className="mt--9" fluid>
                <Link to="/admin/listeCommission">
                    <Button className="mt-2" color="danger" type="button">
                        Retour
                    </Button>
                </Link>
                <Row className="mt-3">
                    <div className="mt-3 col-md-6">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Commission</h3>
                            </CardHeader>

                            <CardBody className="bg-transparent border-0">
                                {erreur ? (
                                    <div className="alert alert-danger">
                                        {erreur}
                                    </div>) : (<span></span>)
                                }
                                <Form role="form" onSubmit={handleSubmit}>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="min"> Prix </label>
                                        <Input className="mb-2" placeholder="min value" type="text" name="min" id="min" value={min} onChange={(e) => setMin(e.target.value)} />
                                        <Input placeholder="max value" type="text" name="max" id="max" value={max} onChange={(e) => setMax(e.target.value)} />

                                        <label className="form-control-label text-white" htmlFor="commission">Valeur</label>
                                        <Input placeholder="Ecrire ici" type="text" id="commission" name="valeur" value={valeur} onChange={(e) => setValeur(e.target.value)} />
                                    </FormGroup>

                                    <Button type="submit" color="primary">Valider</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );

};

export default ModifierCommission;
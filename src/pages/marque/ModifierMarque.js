import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import api from "services/api";


const ModifierMarque =()=>{
    const {id} = useParams();

    const initialValue = {
        libelle : null,
        etat : 1
    };

    const [marqueModif,setMarque] = useState(initialValue);
    const [pays,setPays] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() =>{
        const getData = async () => {
            try {
                const responseMarque = await api.get(`/marque/${id}`);
                const responsePays = await api.get(`/pays`);
                setMarque(responseMarque.data.data);
                setPays(responsePays.data.data);
            } catch (error) {
                console.error('Erreur', error);
            }
        };
        getData();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(marqueModif);
        try {
            await api.put(`/marque/${id}`,marqueModif);
            window.location.replace('/admin/listeMarque');
        } catch (error) {
            setErreur(error.response.data.error);
        }
    }
    

    
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
                            <Form role="form" onSubmit={handleSubmit}>
                                <Card className="bg-default shadow">
                                    <CardHeader className="bg-transparent border-0">
                                        <h3 className="text-white mb-0">Marque</h3>
                                    </CardHeader>
                                    
                                    <CardBody className="bg-transparent border-0">
                                            {erreur ? (
                                                <div className="alert alert-danger">
                                                    {erreur}
                                                </div>) : (<span></span>)
                                            }
                                            <FormGroup className="mb-3">
                                                <label className="form-control-label text-white" htmlFor="libelle">Nom</label>
                                                <Input placeholder="Ecrire ici" type="text" id="libelle" name="libelle" value={marqueModif?.libelle || ""} onChange={(e) => setMarque({...marqueModif,libelle:e.target.value})}/>
                                            </FormGroup>
                                            <FormGroup className="mb-3">
                                                <label className="form-control-label text-white" htmlFor="idpays">Pays</label>
                                                <Input type="select" 
                                                    id="idpays" 
                                                    onChange={(e) => setMarque({ 
                                                        ...marqueModif, 
                                                        pays: { 
                                                          ...marqueModif.pays, 
                                                          id: e.target.value 
                                                        }
                                                      })}
                                                    value={marqueModif?.pays?.id}
                                                    name="idpays">
                                                    <option value="">Sélectionner</option>
                                                    {pays?.map((ctr, index) => (
                                                        <option key={index} value={ctr.id}>{ctr.libelle}</option>
                                                    ))}
                                                    
                                                </Input>
                                            </FormGroup>
                                        
                                        <Button type="submit" color="primary">Valider</Button>
                                        
                                    </CardBody>
                                </Card>
                            </Form>
                        </div>
                    </Row>
                </Container>
            </>
        );
    
};

export default ModifierMarque;
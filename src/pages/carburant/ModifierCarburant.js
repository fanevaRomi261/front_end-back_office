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

const ModifierCarburant =  ()=>{
        const id = useParams().id;
        console.log('id',id);
        const [libelle, setLibelle] = useState(null);
        
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/admin/carburant/${id}`);
                    console.log(response);
                    setLibelle(response.data.data.libelle);
                } catch (error) {
                    console.error('Erreur',error);
                }
            };
            fetchData();
        },[id]);
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await api.put(`admin/carburant/${id}`,{
                    libelle
                });
                window.location.replace('/admin/listeCarburant')
            } catch (error) {
                console.error('error',error)
            }
        }

        return(
            <>
                <Header/>
                <Container className="mt--9" fluid>
                    <Link to="/admin/listeCarburant">
                        <Button className="mt-2" color="danger" type="button">
                        Retour
                        </Button>
                    </Link>
                    <Row className="mt-3">
                        <div className="mt-3 col-md-6">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Carburant</h3>
                                </CardHeader>

                                <CardBody className="bg-transparent border-0">
                                    <Form role="form" onSubmit={handleSubmit}>
                                        <FormGroup className="mb-3">
                                            <label className="form-control-label text-white" htmlFor="libelle">Libelle</label>
                                            <Input placeholder="Ecrire ici" type="text" id="libelle" name="libelle" value={libelle} onChange={(e)=>setLibelle(e.target.value)} />
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

export default ModifierCarburant;
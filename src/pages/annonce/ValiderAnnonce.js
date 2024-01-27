import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    Button,
} from "reactstrap";
import api from "services/api";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import StylishLoader from "../tools/StylishLoader";



const ValiderAnnonce =()=> {


    const [annonces,setAnnonces] = useState([]);
    const [loading,setLoading] = useState(true);
    const [loadingValider, setLoadingValider] = useState({});
    const [loadingRefuser, setLoadingRefuser] = useState({});

    const getData = async () => {
        try {
            const responseMarque = await api.get("/admin/annonce/non-valider");
            setAnnonces(responseMarque.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    },[]);

    const handleValider = async (id) => {
        try {
            setLoadingValider((prev) => ({ ...prev, [id]: true }));
            await api.put(`/admin/annonce/${id}/validation`);
            getData();
        } catch (error) {
            console.error('erreur', error);
        } finally {
            setLoadingValider((prev) => ({ ...prev, [id]: false }));
        }
    }

    const handleRefuser = async (id) => {
        try {
            setLoadingRefuser((prev) => ({ ...prev, [id]: true }));
            await api.put(`/admin/annonce/${id}/refus`);
            getData();
        } catch (error) {
            console.error('erreur', error);
        } finally {
            setLoadingRefuser((prev) => ({ ...prev, [id]: false }));
        }
    }

    
    return(
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    {loading && (
                        <Col xl="12" className="text-center mt-8">
                            <StylishLoader loaderColor="#2b8a8a" />
                        </Col>
                    )}
                    {!loading && (
                    <React.Fragment key={1}>
                        {annonces?.map((annonce, index) => (
                            <Col key={index} md="4" className="mt-3">
                                <Card className="bg-secondary shadow rounded" style={{ border: '1px solid #ccc' }}>
                                    
                                    <Carousel showArrows={true} showThumbs={false}>
                                    {annonce.photo.map((photo, photoIndex) => (
                                        <div key={photoIndex}>
                                        <CardImg top width="100%" height="200px" 
                                            src={photo.link}
                                            alt={`Image ${photoIndex + 1}`}
                                        />
                                        </div>
                                    ))}
                                    </Carousel>

                                    <CardBody className="bg-transparent border-0">
                                        <h4>Nom : {annonce.nomVoiture}</h4>
                                        <p>Marque : {annonce.marque.libelle}</p>
                                        <p>Publie par : {annonce.utilisateur.nom} {annonce.utilisateur.prenom}</p>
                                        <p>Date : {new Date(annonce.date).toLocaleString()}</p>
                                        <div className="d-flex flex-column justify-content-between align-items-center">
                                            <Link to={`/admin/detailAnnonce/${annonce.id}`} className="btn btn-default mb-2"><i className="ni ni-bullet-list-67"></i> Détails</Link>
                                            <div className="d-flex">
                                                <Button type="button" color="success" onClick={() => handleValider(annonce.id)} className="mr-2" disabled={loadingValider[annonce.id]}>
                                                    {loadingValider[annonce.id] ? <StylishLoader loaderColor="#fff" /> : <><i className="ni ni-check-bold"></i> Valider</>}
                                                </Button>
                                                <Button type="button" color="danger" onClick={() => handleRefuser(annonce.id)} disabled={loadingValider[annonce.id]}>
                                                    {loadingRefuser[annonce.id] ? <StylishLoader loaderColor="#fff" /> : <><i className="ni ni-fat-remove"></i> Refuser</>}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </React.Fragment>
                    )}
                </Row>
            </Container>
        </>
    );



}

export default ValiderAnnonce;

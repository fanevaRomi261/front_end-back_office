import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody,CardImg, Button } from "reactstrap";
import api from "services/api";
import StylishLoader from "../tools/StylishLoader";
import { Carousel } from 'react-responsive-carousel';

const DetailAnnonce = () => {
  const { id } = useParams();

  const [annonce,setAnnonce] = useState(null);
  const [loading,setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await api.get(`/admin/annonce/${id}`);
      setAnnonce(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur', error);
      setLoading(false);
    }
    
  }

  const handleValider = async () => {
    try {
      await api.put(`/admin/annonce/${id}/validation`);
      window.location.replace('/admin/listeMarque');
    } catch (error) {
      console.error('erreur',error);
    }
  }

  const handleRefuser = async () => {
    try {
      await api.put(`/admin/annonce/${id}/refus`);
      window.location.replace('/admin/listeMarque');
    } catch (error) {
      console.error('erreur',error);
    }
  }

  useEffect(() => {
    getData();
  },[id]);
  

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
      <Link to="/admin/validerAnnonce">
        <Button type="button" color="default">
          <i className="ni ni-bold-left"></i> Retour
        </Button>
      </Link>
        <Row>
          {loading && (
              <Col xl="12" className="text-center mt-8">
                  <StylishLoader loaderColor="#2b8a8a" />
              </Col>
          )}
          {!loading && (
            <React.Fragment key={1}>
              <Col md="6" className="mx-auto">
                <Card className="bg-secondary shadow rounded" style={{ border: '1px solid #ccc' }}>
                  <CardBody className="bg-transparent border-0">
                    <h4 className="mb-4">Marque : {annonce.marque.libelle}</h4>
                    <Carousel showArrows={true} showThumbs={false}>
                      {annonce.photo.map((photo, photoIndex) => (
                          <div key={photoIndex}>
                          <CardImg top width="100%" height="300px" 
                              src={`data:${photo.type};base64,${photo.data}`}
                              alt={`Image ${photoIndex + 1}`}
                          />
                          </div>
                      ))}
                    </Carousel>
                    
                    <p className="mt-2">Categorie : {annonce.categorie.libelle}</p>
                    <p>Type : {annonce.type.libelle}</p>
                    <p>Date : {annonce.date}</p>
                    <p>Publie par : {annonce.utilisateur.nom} {annonce.utilisateur.prenom}</p>
                    <p>Description : {annonce.description}</p>

                    <div className="d-flex">
                        <Button type="button" color="success" onClick={() => handleValider()} className="mr-2">
                            <i className="ni ni-check-bold"></i> Valider
                        </Button>
                        <Button type="button" color="danger" onClick={() => handleRefuser()}>
                            <i className="ni ni-fat-remove"></i> Refuser
                        </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              </React.Fragment>
            )}


        </Row>
      </Container>
    </>
  );
};

export default DetailAnnonce;

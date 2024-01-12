import Header from "components/Headers/Header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

const DetailAnnonce = () => {
  const { id } = useParams();

  const details = {
    title: `Annonce ${id}`,
    description: `Description détaillée de l'annonce ${id}.`,
    imageUrls: [
      `https://picsum.photos/300/200?random=${id}&1`,
      `https://picsum.photos/300/200?random=${id}&2`,
      `https://picsum.photos/300/200?random=${id}&3`,
    ], // Replace with the actual image URLs
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % details.imageUrls.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + details.imageUrls.length) % details.imageUrls.length
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="8" className="mx-auto mt-3">
            <Card className="bg-secondary shadow rounded" style={{ border: '1px solid #ccc' }}>
              <CardBody className="bg-transparent border-0 text-center">
                <h4 className="mb-4">{details.title}</h4>
                <img
                  src={details.imageUrls[currentImageIndex]}
                  alt={`Annonce ${id} - ${currentImageIndex + 1}`}
                  className="img-fluid rounded"
                  style={{ maxHeight: '400px', marginBottom: '20px' }}
                />
                <div className="d-flex justify-content-between mb-4">
                  <Button type="button" color="default" onClick={goToPreviousImage}>
                    <i className="ni ni-bold-left"></i> Previous
                  </Button>
                  <Button type="button" color="default" onClick={goToNextImage}>
                    Next <i className="ni ni-bold-right"></i>
                  </Button>
                </div>
                <p className="text-muted mb-4">{details.description}</p>
                <Link to="/admin/validerAnnonce">
                  <Button type="button" color="default">
                    <i className="ni ni-bold-left"></i> Retour
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailAnnonce;

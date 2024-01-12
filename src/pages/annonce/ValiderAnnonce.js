import Header from "components/Headers/Header";
import React from "react";
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

const ValiderAnnonce =()=> {
        const annonces = [
            { 
                imageUrl: "https://picsum.photos/200/300", 
                title: "Annonce 1", 
                description: "Description de l'annonce 1. Ceci est une description détaillée de l'annonce 1." 
            },
            { 
                imageUrl: "https://picsum.photos/201/301", 
                title: "Annonce 2", 
                description: "Description de l'annonce 2. Ceci est une description détaillée de l'annonce 2." 
            },
            { 
                imageUrl: "https://picsum.photos/202/302", 
                title: "Annonce 3", 
                description: "Description de l'annonce 3. Ceci est une description détaillée de l'annonce 3." 
            },
            { 
                imageUrl: "https://picsum.photos/203/303", 
                title: "Annonce 4", 
                description: "Description de l'annonce 4. Ceci est une description détaillée de l'annonce 4." 
            },
            { 
                imageUrl: "https://picsum.photos/204/304", 
                title: "Annonce 5", 
                description: "Description de l'annonce 5. Ceci est une description détaillée de l'annonce 5." 
            },
        ];

        return(
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>
                        {annonces.map((annonce, index) => (
                            <Col key={index} md="4" className="mt-3">
                                <Card className="bg-secondary shadow rounded" style={{ border: '1px solid #ccc' }}>
                                    <CardImg top width="100%" height="180px" src={annonce.imageUrl} alt={`Image ${index + 1}`} />
                                    <CardBody className="bg-transparent border-0">
                                        <h4>{annonce.title}</h4>
                                        <p className="text-muted">{annonce.description}</p>
                                        <Link to={`/admin/detailAnnonce/${index + 1}`} className="btn btn-default"><i className="ni ni-bullet-list-67"></i> Détails</Link>
                                        <Button type="button" color="success"><i className="ni ni-bold-right"></i>Valider</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </>
        );
}

export default ValiderAnnonce;

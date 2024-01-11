import {
  Card,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";

const ValiderAnnonce = () => {

  return (
    <Row>
      <h5 className="mb-3 mt-3">Annonce non validée</h5>
      
        <Col md="4">
          <Card>
            <CardImg alt="Card image cap" src={bg1} top width="100%" />
            <CardBody>
              <CardTitle tag="h5">Toyota</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Prix : mora be
              </CardSubtitle>
              <CardText>
                <p>Categorie : milay</p>
              </CardText>
              <div className="button-group">
                <Button>Voir plus</Button>
                <Button className="btn" color="success">Valider</Button>
                <Button className="btn" color="danger"><i className="bi bi-heart"></i>Ajouter favoris</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card>
            <CardImg alt="Card image cap" src={bg2} top width="100%" />
            <CardBody>
              <CardTitle tag="h5">Toyota</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Prix : mora be
              </CardSubtitle>
              <CardText>
                <p>Categorie : milay</p>
              </CardText>
              <div className="button-group">
                <Button>Voir plus</Button>
                <Button className="btn ml-2" color="success">Valider</Button>
                <Button className="btn" color="danger"><i className="bi bi-heart"></i>Ajouter favoris</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card>
            <CardImg alt="Card image cap" src={bg3} top width="100%" />
            <CardBody>
              <CardTitle tag="h5">Toyota</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Prix : mora be
              </CardSubtitle>
              <CardText>
                <p>Categorie : milay</p>
              </CardText>
              <div className="button-group">
                <Button>Voir plus</Button>
                <Button className="btn ml-2" color="success">Valider</Button>
                <Button className="btn" color="danger"><i className="bi bi-heart"></i>Ajouter favoris</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="4">
          <Card>
            <CardImg alt="Card image cap" src={bg3} top width="100%" />
            <CardBody>
              <CardTitle tag="h5">Toyota</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Prix : mora be
              </CardSubtitle>
              <CardText>
                <p>Categorie : milay</p>
              </CardText>
              <div className="button-group">
                <Button>Voir plus</Button>
                <Button className="btn ml-2" color="success">Valider</Button>
                <Button className="btn" color="danger"><i className="bi bi-heart"></i>Ajouter favoris</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

    </Row>
  );
};

export default ValiderAnnonce;

import { Link } from "react-router-dom";
import {
    Card,
    CardTitle,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button
  } from "reactstrap";
  
  const InsererMarque = () => {
    return (
        <Col lg="6">
            <Link to="/listeMarque">
                <Button className="btn" color="danger">
                Retour
                </Button>
            </Link>
            <Card className="mt-3">
                <CardTitle tag="h6" className="border-bottom p-3 mb-0"> 
                Inserer marque
                </CardTitle>
                <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="nom">nom</Label>
                        <Input
                            id="nom"
                            name="nom"
                            placeholder="Ecrire ici"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pays">Select</Label>
                        <Input id="pays" name="pays" type="select">
                            <option>Madagascar</option>
                            <option>Allemagne</option>
                            <option>France</option>
                            <option>US</option>
                            <option>UK</option>
                        </Input>
                    </FormGroup>
                    <Button className="btn" color="primary">
                        Valider
                    </Button>
                </Form>
                </CardBody>
            </Card>
        </Col>
    );
  };
  
  export default InsererMarque;
  
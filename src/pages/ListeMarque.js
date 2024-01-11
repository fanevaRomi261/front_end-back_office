import { Link } from "react-router-dom";
import {
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

const ListeMarque = () => {
  return (
    <Col lg="12">
      <Link to="/insererMarque">
        <Button className="btn" color="primary">
          Nouveau
        </Button>
      </Link>
      <Card className="mt-4">
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-card-text me-2"> </i>
          Liste marque
        </CardTitle>
        <CardBody className="">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Pays</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mercedes</td>
                <td>Allemagne</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                        <i className="bi bi-pen"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Modifier</DropdownItem>
                      <DropdownItem>Supprimer</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
              <tr>
                <td>Renault</td>
                <td>France</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle caret nav></DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Modifier</DropdownItem>
                      <DropdownItem>Supprimer</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ListeMarque;

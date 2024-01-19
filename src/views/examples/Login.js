import React, { useState } from 'react';
import api from 'services/api';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import Loader from 'pages/tools/Loader';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await api.post('/rest/auth/login', { email, password });
      const authToken = response.data.token;

      localStorage.setItem('authToken', authToken);
      window.location.href = '/admin/index'
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <h3 className="text-center text-muted"> LOGIN </h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-4">

            <Form onSubmit={handleLogin}>
              <FormGroup className="mb-4">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              {loading ? (
                <div className="text-center">
                  <Button className="my-4">
                    <Loader  />
                  </Button>
                </div>
              ) : (
                <div>
                  {error && <p className='alert alert-danger'>{error}</p>}
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit" >
                      Sign in
                    </Button>
                  </div>
                </div>
              )}


            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;

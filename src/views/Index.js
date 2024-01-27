import Chart from "chart.js";
import { Line,Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle
} from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import { venteChartOptions } from "variables/chartBarOptions";
import api from "services/api";
import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header.js";
import StylishLoader from "../pages/tools/StylishLoader";

const Index = (prop) => {
  const [statCommission, setStatCommission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYearCommission, setSelectedYearCommission] = useState(2024);
  const [statVente, setStatVente] = useState(null);
  const [selectedYearVente, setSelectedYearVente] = useState(2024);
  const [statUser, setStatUser] = useState(null);

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const responseCommission = await api.get('/statistique/commission');
        setStatCommission(responseCommission.data.data);

        const responseVente = await api.get('/statistique/vente');
        setStatVente(responseVente.data.data);

        const responseNombre = await api.get('/statistique/nombre_utilisateur');
        setStatUser(responseNombre.data.data);

        console.log(responseVente.data.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const commissionChart = () => {
    if (!statCommission) return null;

    const filteredData = statCommission.filter(entry => entry.annee === selectedYearCommission);

    const data = {
      labels: monthNames,
      datasets: [
        {
          label: `Commission for ${selectedYearCommission}`,
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderColor: "rgba(255,255,255,0.7)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255,255,255,0.7)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,255,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Array.from({ length: 12 }, (_, i) =>
            filteredData.find(entry => entry.mois === i + 1)?.total || 0
          ),
        },
      ],
    };

    return data;
  };

  const venteChart = () => {
    if (!statVente) return null;

    const filteredData = statVente.filter(entry => entry.annee === selectedYearVente );

    const data = {
      labels: monthNames,
      datasets: [
        {
          label: `Vente for ${selectedYearVente }`,
          backgroundColor: "rgba(255,99,132,1)", // Adjust the color as needed
          borderColor: "rgba(255,99,132,1)", // Adjust the color as needed
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)", // Adjust the color as needed
          hoverBorderColor: "rgba(255,99,132,1)",
          data: Array.from({ length: 12 }, (_, i) =>
            filteredData.find(entry => entry.mois === i + 1)?.nombre || 0
          ),
        },
      ],
    };

    return data;
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {loading ? (
          <Col xl="12" className="text-center mt-8">
            <StylishLoader loaderColor="#2b8a8a" />
          </Col>
        ) : (
          <>
            <div style={{ width: "18rem" }}>
                <Card className="card-stats mb-4 mb-lg-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle className="text-muted mb-0">
                          Nombre de compte
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{statUser?.total}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-user" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <p>admin : {statUser.nbadmin}</p>
                      <p>user : {statUser.nbuser}</p>
                      <span className="text-nowrap">Depuis la creation</span>
                    </p>
                  </CardBody>
                </Card>
            </div>

            <Row>
              <Col className="mb-5 mb-xl-0 mt-5" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="text-white mb-0">Total commission en {selectedYearCommission}</h2>
                      </div>
                      <div className="col-auto">
                        <select
                          style={{ width: '120px' }}
                          className="form-control"
                          value={selectedYearCommission}
                          onChange={(e) => setSelectedYearCommission(parseInt(e.target.value))}
                        >
                          <option value={2022}>2022</option>
                          <option value={2023}>2023</option>
                          <option value={2024}>2024</option>
                        </select>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      {commissionChart() && <Line data={commissionChart()} options={chartOptions()} />}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col className="mb-5 mb-xl-0 mt-5" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="text-white mb-0">Total vente en {selectedYearVente}</h2>
                      </div>
                      <div className="col-auto">
                        <select
                          style={{ width: '120px' }}
                          className="form-control"
                          value={selectedYearVente}
                          onChange={(e) => setSelectedYearVente(parseInt(e.target.value))}
                        >
                          <option value={2022}>2022</option>
                          <option value={2023}>2023</option>
                          <option value={2024}>2024</option>
                        </select>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      {venteChart() && <Bar data={venteChart()} options={venteChartOptions()} />}
                    </div>
                  </CardBody>
                </Card>
              </Col>

            </Row>
            </>
          )}
      </Container>
    </>
  );
};

export default Index;

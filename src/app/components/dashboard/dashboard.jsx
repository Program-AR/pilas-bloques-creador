import React, { PureComponent } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import "./dashboard.css"

class Dashboard extends PureComponent {

  render() {
    return( 
    <Container fluid>
      <Row className="text-center">
      <Col md={12}>
        <div className="welcome"> 
          <h1>¡Bienvenido/a { this.props.user.username }!</h1>
          <p>Utilizá la barra superior para navegar por el sitio</p>
          <div>
            <img src="staticos/assets/images/primer-ciclo.png" alt="welcome"/>
          </div>
        </div>
      </Col>
      </Row>
    </Container>
    );
  }

}

export default Dashboard;
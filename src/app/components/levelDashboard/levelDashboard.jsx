import React, { PureComponent } from 'react';
import Level from './level';
import List from '../list';
import { Container, Col, Row } from "react-bootstrap";
import "./levelDashboard.css"

class LevelDashboard extends PureComponent {

  render() {
    return (
    <Container fluid>
      <Row className="text-center">
        <Col md={12}>
          <div className="welcome"> 
            <div>
              <h3>Mis Niveles</h3>
              <div className="listContainer">
                <List
                  listClass="list-group"
                  itemClass="list-group-item incident"
                  items={this.props.levels}
                  itemGetter={this._buildLevel}
                  />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    )
  }

  _buildLevel = item => <Level {...this.props} item={item}/>
}

export default LevelDashboard;
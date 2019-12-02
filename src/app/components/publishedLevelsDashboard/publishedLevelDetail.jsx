import React from "react";
import styled from 'styled-components';
import {Col, Container, Row} from "react-bootstrap";
import GridComponent from "../createLevel/GridComponent";
import Grid from "../createLevel/model/Grid";
import Position from "../createLevel/model/Position";
import Character from "../createLevel/model/Character";
import Element from "../createLevel/model/Element";
import Comments from "../comments";
import {PrimaryActionButton} from "../common/PrimaryActionButton";
import ReactStars from 'react-stars'
import * as _ from 'lodash'

const PublishedLevelDetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 90%;
  padding-top:30px;
  margin: auto;
  padding-bottom: 20px;
`;

const LevelDetails = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 6%;
`;

const getInitialRate = (rates, user) => {
    const index = _.findLastIndex(rates, ({author}) => author === user);
    if (index === -1) {
        return _.meanBy(rates, 'rate');
    } else {
        return rates[index].rate
    }
};

const Loading = () => (
  <Container fluid>
    <Row className="text-center">
      <div className="welcome">
        <h2>Estamos cargando el nivel!</h2>
        <i class="fa fa-spinner fa-lg" aria-hidden="true"/>
      </div>
    </Row>
  </Container>
)

export default ({ publishedLevelToDetail,user, onDownload, onComment, onRate }) => {
  if(!publishedLevelToDetail)
    return <Loading/>;
  const gridData = publishedLevelToDetail.grids[0];
  const __toElement = it => {
    const positions = it.positions.map(({ row, column }) => new Position(row, column));
    return it.type === "character" ? new Character(it.icon, positions[0]) : new Element(it.type, it.icon, positions)
  };
  const grid = new Grid(gridData.rows, gridData.columns, gridData.elements.map(__toElement));
  const initialRate = getInitialRate(publishedLevelToDetail.publishData.rates,user.username);
  return (
    <Container fluid>
      <Row className="text-center">
        <Col md={12}>
          <div className="welcome">
            <div>
              <br />
              <h3>{publishedLevelToDetail.name}</h3>
              <PublishedLevelDetailContainer>
                <GridComponent grid={grid}/>
                <LevelDetails>
                  <label><b>Enunciado:</b> {publishedLevelToDetail.category}</label>
                  <label><b>Sugerencias:</b> {publishedLevelToDetail.advice}</label>
                  <label><b>Autor:</b> {publishedLevelToDetail.user}</label>
                  <label style={{ textAlign: "left" }}><b>Categorías:</b>  {publishedLevelToDetail.publishData.categories.join()}</label>
                  <label><b>Dificultad:</b> {publishedLevelToDetail.publishData.difficulty}</label>
                  <label><b>Descargas:</b> {publishedLevelToDetail.publishData.downloads}</label>
                  <div style={{"display":"flex"}}>
                      <b style={{"display":"flex","align-items":"center"}}>Calificacion:</b> <ReactStars count={5}
                                                    onChange={onRate}
                                                    size={24}
                                                    value={initialRate}
                                                    half={false}
                                                    color2={'#ffd700'}/>
                  </div>

                <span >
                    <PrimaryActionButton onClick={() => onDownload(publishedLevelToDetail)}>Exportar</PrimaryActionButton>
                  </span>
                </LevelDetails>
              </PublishedLevelDetailContainer>
              <Comments level={publishedLevelToDetail} onComment={onComment}/>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

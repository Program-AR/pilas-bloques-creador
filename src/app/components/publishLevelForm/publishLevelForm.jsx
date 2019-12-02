import React, {useState} from 'react';
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import Select from "react-select";
import _ from "lodash"
import "./publishLevelForm.css"
import {categories} from "../common/Categories";
import {difficulties} from "../common/Difficulties";

export default ({onPublish}) => {
  const toSelectOptions = (options) => options.map(it => ({value: it, label: it}) );
  const selectableCategories = toSelectOptions(categories);
  const selectableDifficulties = toSelectOptions(difficulties);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(selectableDifficulties[0]);
  const [showMissingCategoryAlert, setShowMissingCategoryAlert] = useState(false);
  const publishLevel = () => {
    if(_.isEmpty(selectedCategories)){
      setShowMissingCategoryAlert(true);
    } else {
      onPublish(selectedCategories.map(it => it.value), selectedDifficulty.value);
    }
  };
  return (
    <Container fluid>
      <Row className="text-center">
        <Col md={12}>
          <div className="welcome">
            <div>
              <h3>Publicar Nivel</h3>
              <div className="combo">
                <label><h4>Categorías</h4></label>
                {categoriesDropdown(selectableCategories, selectedCategories, setSelectedCategories)}
                {showMissingCategoryAlert && <Alert variant='danger' dismissible onClose={() => setShowMissingCategoryAlert(false)}>
                  Elegí al menos una categoría
                </Alert>}
              </div>
              <br/>
              <div className="combo">
                <label><h4>Dificultad</h4></label>
                {difficultyDropdown(selectableDifficulties, selectedDifficulty, setSelectedDifficulty)}
              </div>
              <br/>
              <Button onClick={publishLevel}>Publicar</Button>
              <br />
              <br />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

const categoriesDropdown = (categories, selectedCategories, setSelectedCategories) => {
  return <Select
    isMulti
    value={selectedCategories}
    onChange={selectedCategories => setSelectedCategories(selectedCategories)}
    options={categories}
  />
};

const difficultyDropdown = (difficulties, selectedDifficulty, setSelectedDifficulty) => {
  return <Select
    value={selectedDifficulty}
    onChange={selectedDifficulty => setSelectedDifficulty(selectedDifficulty)}
    options={difficulties}
  />
};

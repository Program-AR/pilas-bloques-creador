import React, {useState} from 'react';
import _ from "lodash";
import PublishedLevel from '../levelDashboard/level';
import List from '../list';
import {Col, Container, Row} from "react-bootstrap";
import "./publishedLevelsDashboard.css"
import Select from "react-select";
import {difficulties} from "../common/Difficulties";
import {categories} from "../common/Categories";
import SearchFilter from "./SearchFilter";
import LevelSorter from "./LevelSorter";

export default (props) => {
  const publishedLevel = item => <PublishedLevel {...props} item={item} publish/>;

  const [searchText, setSearchText] = useState(null);

  const toSelectOptions = (options) => options.map(it => ({value: it, label: it}));

  const selectableDifficulties = toSelectOptions(difficulties);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const selectableCategories = toSelectOptions(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mostRecentlyPublishedLevelSorter = new LevelSorter((level1, level2) => {
    return new Date(level2.publishData.publicationDate) - new Date(level1.publishData.publicationDate);
  });
  const mostDownloadsLevelSorter = new LevelSorter((level1, level2) => {
    return level2.publishData.downloads - level1.publishData.downloads;
  });
  const bestRatedLevelSorter = new LevelSorter((level1, level2) => {
    const mean = (rates) => _.meanBy(rates, 'rate');
    return mean(level2.publishData.rates) - mean(level1.publishData.rates);
  });
  const sortingOptions = [
    {
      label: "Más recientes",
      value: mostRecentlyPublishedLevelSorter
    },
    {
      label: "Más populares",
      value: mostDownloadsLevelSorter
    },
    {
      label: "Mejor calificados",
      value: bestRatedLevelSorter
    }
  ];
  const [selectedSorting, setSelectedSorting] = useState(sortingOptions[0]);

  const filteredLevels = [
    textFilter.forWantedValue(searchText),
    difficultyFilter.forWantedValue(selectedDifficulty && selectedDifficulty.value),
    categoryFilter.forWantedValue(selectedCategory && selectedCategory.value)
  ].reduce((levels, searchFilter) => searchFilter.filter(levels), props.publishedLevels);
  const levelsToShow = selectedSorting.value.sort(filteredLevels);

  return (
    <Container fluid>
      <Row className="text-center">
        <Col md={12}>
          <div className="welcome">
            <div>
              <h3>Niveles Publicados</h3>
              <h6 style={{ textAlign: "left", paddingLeft: "5%" }}>Filtros:</h6>
              <div style={{ paddingRight: "5%", paddingLeft: "5%", display: "grid", gridTemplateColumns: "repeat(4, 20%)", gridColumnGap: "5%"}}>
                <input className="form-control" placeholder="Texto de búsqueda" onChange={(event) => setSearchText(event.target.value)}/>
                {difficultyDropdown(selectableDifficulties, selectedDifficulty, setSelectedDifficulty)}
                {categoryDropdown(selectableCategories, selectedCategory, setSelectedCategory)}
                {sortingDropdown(sortingOptions, selectedSorting, setSelectedSorting)}
              </div>
              <br/>
              <div className="listContainer">
                {!_.isEmpty(levelsToShow) ?
                  <List
                    listClass="list-group"
                    itemClass="list-group-item incident"
                    items={levelsToShow}
                    itemGetter={publishedLevel}
                  /> :
                  <p>No hay resultados que coincidan con el criterio de búsqueda</p>
                }
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const textFilter = new SearchFilter((wantedValue) => (level) => {
  return [level.name, level.category, level.advice].some(field => field.includes(wantedValue));
});
const categoryFilter = new SearchFilter((wantedValue) => (level) => {
  return level.publishData.categories.includes(wantedValue);
});
const difficultyFilter = new SearchFilter((wantedValue) => (level) => {
  return level.publishData.difficulty === wantedValue;
});

const difficultyDropdown = (difficulties, selectedDifficulty, setSelectedDifficulty) => {
  return <Select
    isClearable
    placeholder="Dificultad"
    value={selectedDifficulty}
    onChange={selectedDifficulty => setSelectedDifficulty(selectedDifficulty)}
    options={difficulties}
    hideSelectedOptions
  />
};

const categoryDropdown = (categories, selectedCategory, setSelectedCategory) => {
  return <Select
    isClearable
    placeholder="Categoría"
    value={selectedCategory}
    onChange={selectedCategory => setSelectedCategory(selectedCategory)}
    options={categories}
    hideSelectedOptions
  />
};

const sortingDropdown = (sortingOptions, selectedSorting, setSelectedSorting) => {
  return <Select
    value={selectedSorting}
    onChange={selectedSorting => setSelectedSorting(selectedSorting)}
    options={sortingOptions}
    hideSelectedOptions
  />
};

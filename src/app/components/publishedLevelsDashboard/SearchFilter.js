import _ from "lodash";

export default class SearchFilter {
  constructor(searchCriteria) {
    this.searchCriteria = searchCriteria;
  }

  forWantedValue(wantedValue) {
    this.wantedValue = wantedValue;
    return this;
  }

  filter(levels) {
    return _.isEmpty(this.wantedValue) ?
      levels :
      levels.filter(this.searchCriteria(this.wantedValue));
  }
}
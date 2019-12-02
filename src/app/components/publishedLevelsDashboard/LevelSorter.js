export default class LevelSorter {
  constructor(sortingCriteria) {
    this.sortingCriteria = sortingCriteria;
  }

  sort(levels) {
    return [...levels].sort(this.sortingCriteria);
  }
}
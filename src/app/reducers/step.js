import { Types } from "../actions/wizard";
import {Categories} from '../components/initialSolution/pilas-bloques-blocks'

const DEFAULT_LEVEL = {
  name: "",
  category: "",
  advice: "",
  columns: 3,
  rows: 3,
  initialSolutionXML: "",
  categoriesPermitted: Categories.map((category) => category.name),
  scene: {
    type: "duba"
  },
  grids: [],
  expectation: ""
};

export default(state = { level: DEFAULT_LEVEL, isLoading: false, success: false }, payload) => {
  switch (payload.type) {
    case Types.UPDATE_LEVEL_PROPS: {
      return {...state, level: { ...state.level, ...payload.level} };
    }
    case Types.SAVE: {
      return {...state, isLoading: true };
    }
    case Types.SET_SUCCESS: {
      return { ...state, success: payload.value, isLoading: false };
    }
    default:
      return state;
  }
};

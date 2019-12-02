import { Types } from "../actions/dashboard";

export default(state = { levels: [], publishedLevels: [], publishedLevelToDetail: null }, payload) => {
  switch (payload.type) {
    case Types.SET_LEVELS:
      return { ...state, levels: payload.levels };
    case Types.SET_PUBLISHED_LEVELS:
      return { ...state, publishedLevels: payload.publishedLevels};
    case Types.SET_PUBLISHED_LEVEL_DETAILS:
      return { ...state, publishedLevelToDetail: payload.publishedLevel};
    default:
      return state;
  }
};

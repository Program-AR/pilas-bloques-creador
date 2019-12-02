import { Types } from "../actions/publish";

export default(state = { level: null }, payload) => {
  switch (payload.type) {
    case Types.LOAD_LEVEL_TO_PUBLISH:
      return { ...state, level: payload.level };
    case Types.PUBLISH_LEVEL:
      return { ...state, level: null };
    default:
      return state;
  }
};
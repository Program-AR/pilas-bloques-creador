import { Types } from "../actions/commons";

export default(state = { user: {} }, payload) => {
  switch (payload.type) {
    case Types.SET_ME:
      return {...state, user: payload.user };
    default:
      return state;
  }
};

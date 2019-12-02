import { combineReducers } from 'redux';
import dashboard from '../reducers/dashboard';
import commons from '../reducers/commons';
import level from '../reducers/step';
import publish from "../reducers/publish";

const rootReducer = combineReducers({
  dashboard,
  commons,
  level,
  publish
});

export default rootReducer;

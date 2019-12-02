import api from '../services/api';
import { Types, setSuccess } from '../actions/wizard';
import { ActionsObservable as Observable } from 'redux-observable';

export const saveLevelEpic = (action$, store) =>
  action$
  .ofType(Types.SAVE)
  .flatMap(({ level }) => api.save(level))
  .mapTo(setSuccess(true))
  .catch(() => Observable.of(setSuccess(false)));
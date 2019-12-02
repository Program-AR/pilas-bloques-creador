import api from '../services/api';
import {Types} from '../actions/publish';
import { fetchLevels } from '../actions/dashboard';
import {noop} from "../actions/commons";

export const publishLevelEpic = (action$, store) =>
  action$
    .ofType(Types.PUBLISH_LEVEL)
    .flatMap(({publishedLevel}) => api.publish(publishedLevel))
    .map(() => window.location = "/publishedLevels")
    .map(noop);

export const depublishLevelEpic = (action$, store) =>
  action$
    .ofType(Types.DEPUBLISH_LEVEL)
    .flatMap(({level}) => api.depublish(level))
    .map(fetchLevels);
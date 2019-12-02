import api from '../services/api';
import {Types, setLevels, setPublishedLevels, fetchLevels, setPublishedLevelDetail} from '../actions/dashboard';
import { noop } from "../actions/commons";

export const logoutEpic = (action$, store) =>
  action$
  .ofType(Types.LOGOUT)
  .flatMap(() => api.logout().then(() => window.location = "/"))
  .map(noop);

export const fetchLevelsEpic = (action$, store) =>
  action$
  .ofType(Types.FETCH_LEVELS)
  .flatMap(() => api.levels())
  .map(setLevels);

export const fetchLevelEpic = (action$, store) =>
  action$
  .ofType(Types.FETCH_LEVEL)
  .flatMap(({ id }) => api.level(id))
  .map(setPublishedLevelDetail);

export const fetchPublishedLevelsEpic = (action$, store) =>
  action$
    .ofType(Types.FETCH_PUBLISHED_LEVELS)
    .flatMap(() => api.publishedLevels())
    .map(setPublishedLevels);

export const deleteLevelEpic = (action$, store) =>
  action$
  .ofType(Types.DELETE_LEVEL)
  .flatMap(({ level }) => api.deleteLevel(level))
  .map(fetchLevels)

export const downloadLevelEpic = (action$, store) =>
  action$
  .ofType(Types.DOWNLOAD_LEVEL)
  .flatMap(({ level }) => api.downloadLevel(level))
  .map(noop);

export const commentLevelEpic = (action$, store) =>
  action$
  .ofType(Types.COMMENT_LEVEL)
  .flatMap(({ level, text }) => api.comment(level, text))
  .map(setPublishedLevelDetail);

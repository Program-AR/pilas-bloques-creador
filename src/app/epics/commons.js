import { Observable } from 'rxjs';
import api from '../services/api';
import { setMe, Types } from '../actions/commons';
import Promise from "bluebird";
import { isDesktop } from "../config"

export const dashboardEpic = (action$, store) =>
  action$
  .ofType(Types.FETCH_ME)
  .flatMap(() => isDesktop ? Promise.resolve() : api.me())
  .map(setMe)

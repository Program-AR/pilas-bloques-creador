import api from '../services/api';
import {Types} from '../actions/publishDetails';
import {noop} from "../actions/commons";

export const rate_level = (action$, store) =>
    action$
        .ofType(Types.RATE_LEVEL)
        .flatMap(({ level, rate }) => api.rateLevel(level,rate))
        .map(noop);

import { combineEpics } from 'redux-observable';
import * as dashboardEpics from './dashboard';
import * as commonEpics from './commons';
import * as publishDetailsEpics from './publishDetails';
import * as publishEpics from './publish';
import * as wizardEpics from './wizard';
import _ from 'lodash';

const rootEpic = combineEpics(
  ...(_.values(dashboardEpics)),
	...(_.values(commonEpics)),
	...(_.values(wizardEpics)),
	...(_.values(publishEpics)),
	...(_.values(publishDetailsEpics))
);

export default rootEpic;

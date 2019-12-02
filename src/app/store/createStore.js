import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from  '../epics';

export default reducer => {
	const epicMiddleware = createEpicMiddleware(rootEpic);
	const store = createStore(reducer, applyMiddleware(epicMiddleware));
	return store;
};
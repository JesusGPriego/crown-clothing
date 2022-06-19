import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import { logger } from 'redux-logger';
import { rootReducer } from './rootReducer';

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);

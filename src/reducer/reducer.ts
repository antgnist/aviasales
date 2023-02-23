import { combineReducers } from 'redux';

import numReducer from './numReducer';
import { ticketsReducer, ticketsVisibleReducer } from './ticketsReducer';

const rootReducer = combineReducers({
  num: numReducer,
  tickets: ticketsReducer,
  visibleCount: ticketsVisibleReducer,
});

export default rootReducer;

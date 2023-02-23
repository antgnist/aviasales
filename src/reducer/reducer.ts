import { combineReducers } from 'redux';

import numReducer from './numReducer';
import {
  ticketsReducer,
  ticketsCountReducer,
  ticketsSortReducer,
  ticketsFilterReducer,
} from './ticketsReducer';

const rootReducer = combineReducers({
  num: numReducer,
  tickets: ticketsReducer,
  visibleCount: ticketsCountReducer,
  sort: ticketsSortReducer,
  filters: ticketsFilterReducer,
});

export default rootReducer;

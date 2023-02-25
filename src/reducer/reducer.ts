import { combineReducers } from 'redux';

import numReducer from './numReducer';
import {
  ticketsReducer,
  ticketsCountReducer,
  ticketsSortReducer,
  ticketsFilterReducer,
  loadingReducer,
  searchIdReducer,
} from './ticketsReducer';

const rootReducer = combineReducers({
  num: numReducer,
  tickets: ticketsReducer,
  visibleCount: ticketsCountReducer,
  sort: ticketsSortReducer,
  filters: ticketsFilterReducer,
  loading: loadingReducer,
  searchId: searchIdReducer,
});

export default rootReducer;

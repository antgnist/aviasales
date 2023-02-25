import { combineReducers } from 'redux';

import {
  ticketsReducer,
  ticketsCountReducer,
  ticketsSortReducer,
  ticketsFilterReducer,
  loadingReducer,
  errorReducer,
  searchIdReducer,
} from './ticketsReducer';

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  visibleCount: ticketsCountReducer,
  sort: ticketsSortReducer,
  filters: ticketsFilterReducer,
  loading: loadingReducer,
  searchId: searchIdReducer,
  error: errorReducer,
});

export default rootReducer;

import {
  IActions,
  IActionsFilter,
  IActionsTickets,
  IStateTickets,
  IFilter,
  IFilterKeys,
  IActionsAddTickets,
} from '../interfaces/interfaces';

export const ticketsReducer = (
  tickets: IStateTickets = [],
  action: IActionsAddTickets,
) => {
  switch (action.type) {
    case 'ADD_TICKETS':
      return [...tickets, ...action.payload];

    default:
      return tickets;
  }
};

export const ticketsCountReducer = (
  visibleCount: number = 5,
  action: IActions,
) => {
  switch (action.type) {
    case 'SET_VISIBLE_COUNT':
      if (action.payload) {
        return visibleCount + action.payload;
      }
      return 0;

    default:
      return visibleCount;
  }
};

export const ticketsSortReducer = (
  sort: string = 'price',
  action: IActions,
) => {
  switch (action.type) {
    case 'SET_PRICE_SORT':
      return 'price';

    case 'SET_FAST_SORT':
      return 'fast';

    case 'SET_OPTIMAL_SORT':
      return 'optimal';

    default:
      return sort;
  }
};

export const ticketsFilterReducer = (
  filters: IFilter = {
    all: false,
    without: false,
    one: false,
    two: false,
    three: false,
  },
  action: IActionsFilter,
) => {
  switch (action.type) {
    case 'CHANGE_ANY_FILTER': {
      if (action.payload === 'all') {
        const flag: boolean = filters.all;
        return Object.keys(filters).reduce(
          (acc: IFilter, key) => {
            const result = { ...acc };
            result[key as IFilterKeys] = !flag;
            return result;
          },
          { all: false, without: false, one: false, two: false, three: false },
        );
      }

      let flagAll: boolean;
      if (filters[action.payload]) {
        flagAll = false;
      } else {
        flagAll =
          Object.keys(filters).findIndex(
            (key) =>
              filters[key as IFilterKeys] === false &&
              key !== action.payload &&
              key !== 'all',
          ) === -1
            ? true
            : filters.all;
      }
      return {
        ...filters,
        [action.payload]: !filters[action.payload],
        all: flagAll,
      };
    }

    default:
      return filters;
  }
};

export const loadingReducer = (loading: boolean = true, action: IActions) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'STOP_LOADING':
      return false;

    default:
      return loading;
  }
};

export const errorReducer = (error: boolean = false, action: IActions) => {
  switch (action.type) {
    case 'HAVE_ERROR':
      return true;
    case 'CLEAN_ERROR':
      return false;
    default:
      return error;
  }
};

export const errorConnectionReducer = (
  errorConnection: boolean = false,
  action: IActions,
) => {
  switch (action.type) {
    case 'HAVE_INTERNET_ERROR':
      return true;
    case 'CLEAN_INTERNET_ERROR':
      return false;
    default:
      return errorConnection;
  }
};

export const errorDownloadReducer = (
  errorDownload: boolean = false,
  action: IActions,
) => {
  switch (action.type) {
    case 'HAVE_DOWNLOAD_ERROR':
      return true;
    case 'CLEAN_DOWNLOAD_ERROR':
      return false;
    default:
      return errorDownload;
  }
};

export const searchIdReducer = (
  searchId: string = '',
  action: IActionsTickets,
) => {
  switch (action.type) {
    case 'SET_SEARCH_ID':
      return action.payload;

    default:
      return searchId;
  }
};

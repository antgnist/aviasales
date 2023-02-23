import {
  IActions,
  IActionsFilter,
  // IStateGlobal,
  IStateTickets,
  IFilter,
  IFilterKeys,
} from '../interfaces/interfaces';

export const ticketsReducer = (
  tickets: IStateTickets = [],
  action: IActions,
) => {
  switch (action.type) {
    case 'TEST':
      return [
        ...tickets,
        {
          price: 0,
          carrier: 'test',
          segments: [
            {
              destination: '',
              duration: 1000000,
              date: crypto.randomUUID(),
              origin: '',
              stops: [''],
            },
            {
              destination: '',
              duration: 0,
              date: '',
              origin: '',
              stops: [''],
            },
          ],
        },
      ];

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

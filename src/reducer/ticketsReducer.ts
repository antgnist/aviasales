import {
  IActions,
  // IStateGlobal,
  IStateTickets,
} from '../interfaces/interfaces';

// export const ticketsReducer = (
//   tickets: IStateTickets = [],
//   action: IActions,
// ) => {
//   switch (action.type) {
//     case 'TEST':
//       return [...tickets, { price: 0, carrier: 'test' }];

//     default:
//       return tickets;
//   }
// };

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
    case 'SET_SORT_PRICE':
      return [...tickets.sort((a, b) => a.price - b.price)];

    case 'SET_SORT_FAST':
      return [
        ...tickets.sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration), // сделать так, что функция сортировки при отображении?
        ),
      ];
    default:
      return tickets;
  }
};

export const ticketsVisibleReducer = (
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

import { IActions } from '../interfaces/interfaces';

const reducer = (state = 0, action: IActions) => {
  switch (action.type) {
    case 'RND':
      return state + action.payload!;

    case 'INC':
      return state + 1;

    case 'DEC':
      return state - 1;

    default:
      return state;
  }
};

export default reducer;

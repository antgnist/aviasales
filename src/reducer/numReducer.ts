import { IActions } from '../interfaces/interfaces';

const numReducer = (num: number = 0, action: IActions) => {
  switch (action.type) {
    case 'RND':
      if (action.payload) {
        return num + action.payload;
      }
      return num;

    case 'INC':
      return num + 1;

    case 'DEC':
      return num - 1;

    default:
      return num;
  }
};

export default numReducer;

export interface ITiket {
  price: number;
}

// export interface IStateGlobal {
//   visibleCount?: number;
//   num?: number;
//   tickets: IStateTickets;
// }

export interface IStateGlobal {
  visibleCount?: number;
  num?: number;
  tickets: IStateTickets;
}

export type IStateTickets = {
  price: number;
  carrier: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    duration: number;
    stops: string[];
  }[];
}[];

export interface IActions {
  type: string;
  payload?: number;
}

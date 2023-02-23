export interface ITiket {
  price: number;
}

export interface IStateGlobal {
  visibleCount?: number;
  sort?: string;
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

export interface IFilter {
  all: boolean;
  without: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
}

export type IFilterKeys = 'all' | 'without' | 'one' | 'two' | 'three';

export interface IActions {
  type: string;
  payload?: number;
}

export interface IActionsFilter {
  type: string;
  payload: IFilterKeys;
}

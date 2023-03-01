export interface IStateGlobal {
  tickets: IStateTickets;
  visibleCount?: number;
  sort?: string;
  filters?: IFilter;
  loading?: boolean;
  searchId?: string;
}

export type IStateTickets = {
  id: string;
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

export interface IApiPackTicketsResponse {
  tickets: IStateTickets;
  stop: boolean;
  error?: boolean;
  skip?: boolean;
}

export interface IActions {
  type: string;
  payload?: number;
}

export interface IActionsTickets {
  type: string;
  payload: string;
}

export interface IActionsAddTickets {
  type: string;
  payload: IStateTickets;
}

export interface IActionsFilter {
  type: string;
  payload: IFilterKeys;
}

import { AppDispatch } from '../configureStore';
import {
  IStateTickets,
  IApiPackTicketsResponse,
} from '../interfaces/interfaces';
import ApiService from '../services/ApiService';

const apiService = new ApiService();

export const setVisibleCount = (payload: number) => ({
  type: 'SET_VISIBLE_COUNT',
  payload,
});

export const setFastSort = () => ({ type: 'SET_FAST_SORT' });
export const setPriceSort = () => ({ type: 'SET_PRICE_SORT' });
export const setOptimalSort = () => ({ type: 'SET_OPTIMAL_SORT' });

export const changeAnyFilter = (payload: string) => ({
  type: 'CHANGE_ANY_FILTER',
  payload,
});

export const addTickets = (payload: IStateTickets) => ({
  type: 'ADD_TICKETS',
  payload,
});

export const startLoading = () => ({ type: 'START_LOADING' });
export const stopLoading = () => ({ type: 'STOP_LOADING' });

export const haveError = () => ({ type: 'HAVE_ERROR' });

export const setSearchId = (payload: string) => ({
  type: 'SET_SEARCH_ID',
  payload,
});

export const ticketsAfterAuth = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const searchId = await apiService.getSearchId();
  if (searchId === null) {
    dispatch(stopLoading());
    dispatch(haveError());
    // выдать ещё сообщение об ошибке
  } else {
    dispatch(setSearchId(searchId));

    // // для запроса только одной пачки
    // const response: IApiPackTicketsResponse = await apiService.getPackTickets(
    //   searchId,
    // );
    // if (response.error === true) {
    //   dispatch(stopLoading());
    //   // выдать ещё сообщение об ошибке
    // } else {
    //   dispatch(addTickets(response.tickets));
    //   dispatch(stopLoading());
    // }

    let response: IApiPackTicketsResponse;
    do {
      // eslint-disable-next-line no-await-in-loop
      response = await apiService.getPackTickets(searchId);
      if (response.error === true) {
        console.log('Произошла ошибка в течение загрузки, продолжаем');
      } else {
        dispatch(addTickets(response.tickets));
      }
    } while (response.stop !== true);
    dispatch(stopLoading());
  }
};

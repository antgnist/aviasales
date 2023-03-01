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
export const cleanError = () => ({ type: 'CLEAN_ERROR' });
export const haveConnectionError = () => ({ type: 'HAVE_INTERNET_ERROR' });
export const cleanConnectionError = () => ({ type: 'CLEAN_INTERNET_ERROR' });
export const haveDownloadError = () => ({ type: 'HAVE_DOWNLOAD_ERROR' });
export const cleanDownloadError = () => ({ type: 'CLEANE_DOWNLOAD_ERROR' });

export const setSearchId = (payload: string) => ({
  type: 'SET_SEARCH_ID',
  payload,
});

export const ticketsAfterAuth = () => async (dispatch: AppDispatch) => {
  const controller = new AbortController();
  dispatch(startLoading());

  const timeoutID1 = setTimeout(() => {
    controller.abort();
  }, 15000);
  const searchId = await apiService.getSearchId(controller);
  clearTimeout(timeoutID1);

  if (searchId === null) {
    if (!navigator.onLine) {
      dispatch(haveConnectionError());
    }
    dispatch(stopLoading());
    dispatch(haveError());
  } else {
    dispatch(setSearchId(searchId));
    let response: IApiPackTicketsResponse;
    do {
      const timeoutID2 = setTimeout(() => {
        controller.abort();
      }, 15000);
      // eslint-disable-next-line no-await-in-loop
      response = await apiService.getPackTickets(searchId, controller);
      clearTimeout(timeoutID2);
      if (response.skip !== true) {
        dispatch(addTickets(response.tickets));
      }
      if (response.error === true) {
        if (!navigator.onLine) {
          dispatch(haveConnectionError());
        }
        dispatch(haveDownloadError());
        break;
      }
    } while (response.stop !== true);

    dispatch(stopLoading());
  }
};

import { RootState } from "../..";

export const currencyDataSelector = (state: RootState) =>
  state.currenciesReducer.currenciesData;
export const requestsCountSelector = (state: RootState) =>
  state.currenciesReducer.requestsCount;
export const errorSelector = (state: RootState) =>
  state.currenciesReducer.error;
export const noDataDatesSelector = (state: RootState) =>
  state.currenciesReducer.noDataDates;
export const allRequestsFinishedSelector = (state: RootState) =>
  state.currenciesReducer.allRequestsFinished;

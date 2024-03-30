import { RootState } from "../..";

export const currencyDataSelector = (state: RootState) =>
  state.currenciesReducer.currenciesData;
export const requestsCountSelector = (state: RootState) =>
  state.currenciesReducer.requestsCount;
export const loadingSelector = (state: RootState) =>
  state.currenciesReducer.loading;
export const errorSelector = (state: RootState) =>
  state.currenciesReducer.error;
export const noDataDatesSelector = (state: RootState) =>
  state.currenciesReducer.noDataDates;

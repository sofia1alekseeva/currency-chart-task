import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getRubCurrenciesList } from "../../../utils/api";

type TInitialState = {
  currenciesData: {
    date: string;
    rub: {
      [key: string]: number;
    };
  }[];
  requestsCount: number;
  loading?: string;
  error?: SerializedError;
  noDataDates: Array<Date>;
};
export const initialState: TInitialState = {
  currenciesData: [],
  requestsCount: 0,
  loading: "",
  noDataDates: [],
  error: undefined,
};

export const getRubCurrenciesListThunk = createAsyncThunk(
  "rub",
  getRubCurrenciesList
);

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    clearCurrenciesData: (state) => {
      state.currenciesData = [];
    },
    clearNoDataDates: (state) => {
      state.noDataDates = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRubCurrenciesListThunk.pending, (state) => {
        state.loading = "pending";
        state.requestsCount += 1;
      })
      .addCase(getRubCurrenciesListThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
        const noDataDate = action.meta.arg;
        if (noDataDate) {
          state.noDataDates.push(new Date(noDataDate));
        }
      })
      .addCase(getRubCurrenciesListThunk.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currenciesData.push(action.payload.data);
        state.currenciesData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        state.error = initialState.error;
      });
  },
});

export const { clearCurrenciesData, clearNoDataDates } =
  currenciesSlice.actions;

export default currenciesSlice.reducer;

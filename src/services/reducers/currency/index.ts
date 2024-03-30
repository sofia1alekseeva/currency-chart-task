import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getRubCurrencyList } from "../../../utils/api";

type TInitialState = {
  currencyData: {
    date: string;
    rub: {
      [key: string]: number;
    };
  }[];
  requestsCount: number;
  loading?: string;
  error?: SerializedError;
};
export const initialState: TInitialState = {
  currencyData: [],
  requestsCount: 0,
  loading: "",
  error: undefined,
};

export const getRubCurrencyListThunk = createAsyncThunk(
  "rub",
  getRubCurrencyList
);

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    clearCurrencyData: (state) => {
      state.currencyData = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRubCurrencyListThunk.pending, (state) => {
        state.loading = "pending";
        state.requestsCount += 1;
      })
      .addCase(getRubCurrencyListThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(getRubCurrencyListThunk.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currencyData.push(action.payload.data);
        state.currencyData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        state.error = initialState.error;
      });
  },
});

export const { clearCurrencyData } = currenciesSlice.actions;

export default currenciesSlice.reducer;

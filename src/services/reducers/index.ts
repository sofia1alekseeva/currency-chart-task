import { combineReducers } from "redux";
import currenciesReducer from "./currency";

export const rootReducer = combineReducers({ currenciesReducer });

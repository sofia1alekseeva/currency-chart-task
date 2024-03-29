import axios from "axios";

const API = "currency-api.pages.dev";

const getCurrencyListUrl = (date: string, currency: string) =>
  `https://${date}.${API}/v1/currencies/${currency}.json`;

/**
 *
 * @param date Дата строкой в формате 2001-01-01 (yyyy-MM-DD)
 * @returns Обменный курс валют к рублю
 */
export const getRubCurrencyList = async (date: string) =>
  await axios.get(getCurrencyListUrl(date, "rub"));

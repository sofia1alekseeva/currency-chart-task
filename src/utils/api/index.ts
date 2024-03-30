import axios from "axios";

const API = "currency-api.pages.dev";

/**
 *
 * @param date Дата строкой в формате 2001-01-01 (yyyy-MM-DD)
 * @returns Обменный курс валют к рублю
 */
export const getRubCurrenciesList = async (date: string) =>
  await axios.get(`https://${date}.${API}/v1/currencies/rub.json`);

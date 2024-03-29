import moment from "moment";

/**
 * Форматирование даты в формат для отображения
 * @param date дата (строка или тип Date)
 * @returns дата в формате 01.01.2000
 */
export const formatDate = (date: Date | string): string =>
  moment(date).format("DD.MM.yyyy");

/**
 * Форматирование даты в формат для запроса по апи
 * @param date дата (строка или тип Date)
 * @returns дата в формате 2000-01-01
 */
export const formatApiDate = (date: Date | string): string =>
  moment(date).format("yyyy-MM-DD");

/**
 * Перечислить дни между двумя датами, включая обе даты
 * @param startDate Начальная дата
 * @param endDate Конечная дата
 * @returns Массив с датами
 */
export const enumerateDaysBetweenDates = (
  startDate: Date,
  endDate: Date
): Array<Date> => {
  const date = [];
  while (moment(startDate) <= moment(endDate)) {
    date.push(startDate);
    startDate = moment(startDate).add(1, "days").toDate();
  }
  return date;
};

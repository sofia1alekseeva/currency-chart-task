import moment, { Moment } from "moment";

/**
 * Форматирование даты в формат для отображения
 * @param date дата (строка или тип Date)
 * @returns дата в формате 01.01.2000
 */
export const formatDate = (date: Date | Moment | string): string =>
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

const getOneDateRange = (sequence: Array<Moment>) => {
  const first = formatDate(sequence[0]);
  if (sequence.length === 1) {
    return first;
  }
  const last = formatDate(sequence[sequence.length - 1]);
  return `${first}-${last}`;
};

export const getDateRanges = (dates: Array<Date>) => {
  const ranges: string[] = [];
  let tempArr: Moment[] = [];
  if (dates.length === 1) {
    return formatDate(dates[0]);
  }
  dates.forEach((date, index) => {
    const current = moment(date);
    const next = moment(dates[index + 1]);
    const diff = next.diff(current, "days");
    if (diff === 1) {
      if (dates[index + 1]) {
        tempArr.push(current, next);
      } else {
        tempArr.push(current);
      }
    } else if (index === dates.length - 1 || diff > 1) {
      const range = getOneDateRange(tempArr);
      ranges.push(range);
      tempArr = [];
    }
  });
  return ranges.join(", ");
};

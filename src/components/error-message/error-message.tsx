import { SerializedError } from "@reduxjs/toolkit";
import { FC } from "react";
import { ErrorCodeMessages } from "../../utils/enums";
import { useAppSelector } from "../../hooks";
import { noDataDatesSelector } from "../../services/reducers/currency/selectors";
import { formatDate, getDateRanges } from "../../utils/functions";
import styles from "./error-message.module.css";
import moment from "moment";

const ErrorMessage: FC<{ error: SerializedError }> = ({ error }) => {
  const noDataDates = useAppSelector(noDataDatesSelector);
  const isOnline = window.navigator.onLine;

  return (
    <>
      <p className={styles.message}>
        {error.code}
        <br />
        {error.code && Object.hasOwn(ErrorCodeMessages, error.code)
          ? ErrorCodeMessages[error.code as keyof typeof ErrorCodeMessages]
          : error.message}
        {isOnline
          ? "Нет данных по указанным ниже датам:"
          : "Отсутствует подключение к интернету"}
        <br />
        {isOnline && noDataDates && getDateRanges([...noDataDates])}
        <br />
        {isOnline &&
          noDataDates &&
          `Выберите дату с ${formatDate(
            moment(noDataDates[noDataDates.length - 1]).add(1, "days")
          )} или позднее`}
      </p>
    </>
  );
};

export default ErrorMessage;

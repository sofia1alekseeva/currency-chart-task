import { SerializedError } from "@reduxjs/toolkit";
import { FC } from "react";
import { ErrorCodeMessages } from "../../utils/enums";
import { useAppSelector } from "../../hooks";
import { noDataDatesSelector } from "../../services/reducers/currency/selectors";
import { getDateRanges } from "../../utils/functions";

const ErrorMessage: FC<{ error: SerializedError }> = ({ error }) => {
  const noDataDates = useAppSelector(noDataDatesSelector);

  return (
    <>
      <p>
        {error.code}
        <br />
        {error.code && Object.hasOwn(ErrorCodeMessages, error.code)
          ? ErrorCodeMessages[error.code as keyof typeof ErrorCodeMessages]
          : error.message}
        <br />
        <br />
        {noDataDates && getDateRanges([...noDataDates])}
      </p>
    </>
  );
};

export default ErrorMessage;

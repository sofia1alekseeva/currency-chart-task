import { SerializedError } from "@reduxjs/toolkit";
import { FC } from "react";
import { ErrorCodeMessages } from "../../utils/enums";

const ErrorMessage: FC<{ error: SerializedError }> = ({ error }) => {
  return (
    <>
      <p>
        {error.code}
        <br />
        {error.code && Object.hasOwn(ErrorCodeMessages, error.code)
          ? ErrorCodeMessages[error.code as keyof typeof ErrorCodeMessages]
          : error.message}
      </p>
    </>
  );
};

export default ErrorMessage;

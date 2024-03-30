import { SerializedError } from "@reduxjs/toolkit";
import { FC } from "react";

const ErrorText: FC<{ error: string | SerializedError }> = ({ error }) => {
  return (
    <>
      <span>{error.toString()}</span>
    </>
  );
};
export default ErrorText;

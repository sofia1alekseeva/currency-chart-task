import { ColorRing } from "react-loader-spinner";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <ColorRing
      visible={true}
      height="30%"
      width="30%"
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
};

export default Loader;

import { ChangeEventHandler, FC } from "react";
import styles from "./currency.module.css";

type TCurrencyProps = {
  name: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Currency: FC<TCurrencyProps> = ({ name, id, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id} className={styles.label}>
        {name}
      </label>
    </div>
  );
};

export default Currency;

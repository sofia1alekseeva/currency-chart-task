import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-item.module.css";

type TDateItemProps = {
  id: string;
  name: string;
  selected: Date;
  onChange: CallableFunction;
};

const DateItem: FC<TDateItemProps> = ({ id, name, selected, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {name}
      </label>
      <DatePicker
        selected={selected}
        onChange={(date) => date && onChange(date)}
        dateFormat={"dd.MM.yyyy"}
        id={id}
        className={styles.date_picker}
      />
    </div>
  );
};

export default DateItem;

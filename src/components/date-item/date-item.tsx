import { FC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru"; // the locale you want
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-item.module.css";

type TDateItemProps = {
  id: string;
  name: string;
  selected: Date;
  maxDate?: Date | undefined;
  onChange: CallableFunction;
};
registerLocale("ru", ru);

const DateItem: FC<TDateItemProps> = ({
  id,
  name,
  selected,
  maxDate,
  onChange,
}) => {
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
        popperPlacement="bottom-end"
        locale="ru"
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateItem;

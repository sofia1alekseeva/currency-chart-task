import { ChangeEvent, useEffect, useState } from "react";
import Currency from "../currency/currency";
import Chart from "../chart/chart";
import { currenciesInfo } from "../../utils/constants";
import DateItem from "../date-item/date-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearCurrencyData,
  getRubCurrencyListThunk,
} from "../../services/reducers/currency";
import {
  enumerateDaysBetweenDates,
  formatApiDate,
} from "../../utils/functions";
import moment from "moment";
import { requestsCountSelector } from "../../services/reducers/currency/selectors";
import styles from "./app.module.css";

const App = () => {
  const dispatch = useAppDispatch();
  const requestsCount = useAppSelector(requestsCountSelector);
  const [fromDate, setFromDate] = useState<Date>(
    moment().subtract(6, "days").toDate()
  );
  const [toDate, setToDate] = useState<Date>(moment().toDate());
  const [currencies, setCurrencies] = useState<Array<string>>([]);

  const onCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currency = event.currentTarget.id;
    if (currencies.includes(currency)) {
      setCurrencies(currencies.filter((item) => item !== currency));
    } else {
      setCurrencies([...currencies, currency]);
    }
  };

  useEffect(() => {
    dispatch(clearCurrencyData());
    if (fromDate > toDate) {
      setFromDate(toDate);
    }
    const dates = enumerateDaysBetweenDates(fromDate, toDate);
    dates.forEach((date) =>
      dispatch(getRubCurrencyListThunk(formatApiDate(date)))
    );
  }, [fromDate, toDate]);

  return (
    <main className={styles.main_container}>
      <section className={styles.chart_section}>
        <div className={styles.filter_container}>
          <div className={styles.currencies}>
            {currenciesInfo.map((cur) => (
              <Currency
                key={cur.id}
                name={cur.name}
                id={cur.id}
                onChange={onCurrencyChange}
              />
            ))}
          </div>
          <div className={styles.dates}>
            <DateItem
              id="fromDate"
              name="Дата с"
              selected={fromDate}
              onChange={setFromDate}
              maxDate={toDate}
            />
            <DateItem
              id="toDate"
              name="Дата по"
              selected={toDate}
              onChange={setToDate}
            />
          </div>
        </div>
        <Chart currencies={currencies} />
      </section>
      <span className={styles.requests_count}>
        Число запросов в API: {requestsCount}
      </span>
    </main>
  );
};

export default App;

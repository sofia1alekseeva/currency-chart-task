import { ChangeEvent, useEffect, useRef, useState } from "react";
import Currency from "../currency/currency";
import Chart from "../chart/chart";
import { currenciesInfo } from "../../utils/constants";
import DateItem from "../date-item/date-item";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearError,
  clearNoDataDates,
  getRubCurrenciesListThunk,
  setAllRequestsFinished,
} from "../../services/reducers/currency";
import {
  enumerateDaysBetweenDates,
  formatApiDate,
} from "../../utils/functions";
import moment from "moment";
import {
  currencyDataSelector,
  noDataDatesSelector,
  requestsCountSelector,
} from "../../services/reducers/currency/selectors";
import styles from "./app.module.css";

const App = () => {
  const dispatch = useAppDispatch();
  const requestsCount = useAppSelector(requestsCountSelector);
  const currencyData = useAppSelector(currencyDataSelector);
  const noDataDates = useAppSelector(noDataDatesSelector);
  const [fromDate, setFromDate] = useState<Date>(
    moment().subtract(6, "days").toDate()
  );
  const [toDate, setToDate] = useState<Date>(moment().toDate());
  const fromDateRef = useRef<Date | null>(null);
  const toDateRef = useRef<Date | null>(null);
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
    if (
      currencies.length !== 0 &&
      (fromDate !== fromDateRef.current || toDate !== toDateRef.current)
    ) {
      fromDateRef.current = fromDate;
      toDateRef.current = toDate;
      const dates = enumerateDaysBetweenDates(fromDate, toDate);
      Promise.all(
        dates.map((date) => {
          const apiDate = formatApiDate(date);
          if (
            !currencyData.find((data) => data.date === apiDate) &&
            !noDataDates.find((date) => date === moment(apiDate).toDate())
          ) {
            return dispatch(getRubCurrenciesListThunk(apiDate));
          }
        })
      ).finally(() => {
        dispatch(setAllRequestsFinished(true));
      });
      dispatch(clearNoDataDates());
      dispatch(clearError());
      dispatch(setAllRequestsFinished(false));
    }
  }, [fromDate, toDate, currencies]);

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
              onChange={(value: Date) =>
                setFromDate((prev) => {
                  fromDateRef.current = prev;
                  return value;
                })
              }
              maxDate={toDate}
            />
            <DateItem
              id="toDate"
              name="Дата по"
              selected={toDate}
              onChange={(value: Date) =>
                setToDate((prev) => {
                  toDateRef.current = prev;
                  return value;
                })
              }
              maxDate={moment().toDate()}
              minDate={fromDate}
            />
          </div>
        </div>
        <Chart currencies={currencies} fromDate={fromDate} toDate={toDate} />
      </section>
      <span className={styles.requests_count}>
        Число запросов в API: {requestsCount}
      </span>
    </main>
  );
};

export default App;

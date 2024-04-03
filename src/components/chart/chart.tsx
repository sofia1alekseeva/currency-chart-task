import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { currenciesInfo } from "../../utils/constants";
import styles from "./chart.module.css";
import { formatDate } from "../../utils/functions";
import { useAppSelector } from "../../hooks";
import {
  allRequestsFinishedSelector,
  currencyDataSelector,
  errorSelector,
} from "../../services/reducers/currency/selectors";
import Loader from "../loader/loader";
import ErrorMessage from "../error-message/error-message";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: FC<{
  currencies: Array<string>;
  fromDate: Date;
  toDate: Date;
}> = ({ currencies, fromDate, toDate }) => {
  const currencyData = useAppSelector(currencyDataSelector);
  const error = useAppSelector(errorSelector);
  const filteredCurrencies = currencyData.filter(
    ({ date }) =>
      moment(date).diff(moment(fromDate), "days") >= 0 &&
      moment(date).isSameOrBefore(moment(toDate))
  );
  const allRequestsFinished = useAppSelector(allRequestsFinishedSelector);

  const data = {
    labels: filteredCurrencies.map(({ date }) => formatDate(date)),
    datasets: currencies.map((cur) => {
      const curInfo = currenciesInfo.find(({ id }) => cur === id);
      const datesData = filteredCurrencies.map(({ rub }) => 1 / rub[cur]);
      return {
        label: curInfo?.name,
        data: datesData,
        borderColor: curInfo?.borderColor,
        backgroundColor: curInfo?.backgroundColor,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Курсы валют к рублю",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
    },
  };
  return (
    <div className={styles.container}>
      {currencies.length === 0 && <span>Выберите валюту</span>}
      {currencies.length > 0 && !allRequestsFinished && <Loader />}
      {error && allRequestsFinished && <ErrorMessage error={error} />}
      {currencies.length > 0 && !error && allRequestsFinished && (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default Chart;

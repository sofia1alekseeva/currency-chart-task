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
  currencyDataSelector,
  errorSelector,
  loadingSelector,
} from "../../services/reducers/currency/selectors";
import Loader from "../loader/loader";
import ErrorMessage from "../error-message/error-message";

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
}> = ({ currencies }) => {
  const currencyData = useAppSelector(currencyDataSelector);
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const isLoading = loading === "pending";

  const data = {
    labels: currencyData.map(({ date }) => formatDate(date)),
    datasets: currencies.map((cur) => {
      const curInfo = currenciesInfo.find(({ id }) => cur === id);
      const datesData = currencyData.map(({ rub }) => 1 / rub[cur]);
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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default Chart;

import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import propTypes from "prop-types";

const GraphicChart = ({ data, loading }) => {
  const [transactions, setTransactions] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      // Proses data dari backend
      const formattedMonths = data.map((item) => Object.keys(item)[0]); // Ambil nama bulan (key)
      const formattedTransactions = data.map((item) => Object.values(item)[0]); // Ambil total amount (value)

      setMonths(formattedMonths);
      setTransactions(formattedTransactions);
    } else {
      setTransactions([]);
      setMonths([]);
    }
  }, [data, loading]);

  const chartData = {
    series: [
      {
        name: "Total Transactions",
        data: transactions,
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: months,
      },
      yaxis: {
        labels: {
          formatter: (value) => `Rp ${value.toLocaleString("id-ID")}`,
        },
      },
      tooltip: {
        y: {
          formatter: (value) => `Rp ${value.toLocaleString("id-ID")}`,
        },
      },
      title: {
        text: "Total Transactions Per Month",
        align: "center",
      },
    },
  };

  return (
    <div>
      {loading || !transactions.length || !months.length ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={400}
        />
      )}
    </div>
  );
};

GraphicChart.propTypes = {
  data: propTypes.array,
  loading: propTypes.bool,
};

export default GraphicChart;

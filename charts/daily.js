const generateDailyChartConfig = (values) => {
  const labels = values.map((element) => element.hour);

  const data = values.map((element) => element.value);

  return {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "% de umidade",
          data,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            align: "center",
            text: "Tempo (Horas)",
            font: {
              size: 16
            }
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            align: "center",
            text: "Umidade (%)",
            font: {
              size: 16
            }
          }
        }
      }
    }
  };
};

const generateMonthlyChartConfig = (values) => {
  const maxValues = values.map((element) => element.max);

  const minValues = values.map((element) => element.min);

  return {
    type: "line",
    data: {
      labels: Array(values.length).fill(0).map((_, index) => index + 1),
      datasets: [
        {
          label: "Máximo",
          data: maxValues,
          borderWidth: 2,
        }, {
          label: "Mínimo",
          data: minValues,
          borderWidth: 2,
        }
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            align: "center",
            text: "Tempo (Dia do mês)",
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

const generateWeeklyGraphConfig = (values) => {
  const labels = values.map((element) => element.day);

  const maxValues = values.map((element) => element.max);

  const minValues = values.map((element) => element.min);

  return {
    type: "bar",
    data: {
      labels,
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
      plugins: {
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            align: "center",
            text: "Tempo (Dias da semana)",
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

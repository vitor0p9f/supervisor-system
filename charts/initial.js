const initialGraph = async () => {
  const date = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");

  const response = await fetch(`http://localhost:4000/frontend/daily/${date}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  const values = await response.json();

  chart = new Chart(canvas, generateDailyChartConfig(values));

  return chart;
};

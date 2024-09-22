const buttons = document.querySelectorAll("button");
const canvas = document.querySelector("#chart");

let chart = initialGraph();

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    buttons.forEach((button) => {
      button.classList = "";
    });

    button.classList.add("active");

    const date = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");
    let response = null;
    let values = null;

    switch (button.id) {
      case "daily":
        response = await fetch(`http://localhost:4000/frontend/daily/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        chart.destroy();

        chart = new Chart(canvas, generateDailyChartConfig(values));
        break;

      case "weekly":
        response = await fetch(`http://localhost:4000/frontend/weekly/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        chart.destroy();

        chart = new Chart(canvas, generateWeeklyGraphConfig(values));
        break;

      case "monthly":
        response = await fetch(`http://localhost:4000/frontend/monthly/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        chart.destroy();

        chart = new Chart(canvas, generateMonthlyChartConfig(values));
        break;

      case "annual":
        response = await fetch(`http://localhost:4000/frontend/annual/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        chart.destroy();

        chart = new Chart(canvas, generateAnnualGraphConfig(values));
        break;

      default:
        break;
    }
  });
});

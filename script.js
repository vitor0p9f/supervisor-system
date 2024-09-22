const buttons = document.querySelectorAll("button");
const canvas = document.querySelector("#chart");
const host = "https://supervisor-system.onrender.com";

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
        response = await fetch(`${host}/frontend/daily/${date}`, {
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
        response = await fetch(`${host}/frontend/weekly/${date}`, {
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
        response = await fetch(`${host}/frontend/monthly/${date}`, {
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
        response = await fetch(`${host}/frontend/annual/${date}`, {
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

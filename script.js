const buttons = document.querySelectorAll("button");
const canvas = document.querySelector("#chart");

let chart = initialGraph();

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    buttons.forEach((button) => {
      button.classList = "";
    });

    button.classList.add("active");

    switch (button.id) {
      case "daily":
        const date = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");

        const response = await fetch(`http://localhost:4000/frontend/daily/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        const values = await response.json();

        chart.destroy();

        chart = new Chart(canvas, generateDailyChartConfig(values));

        break;

      default:
        break;
    }
  });
});

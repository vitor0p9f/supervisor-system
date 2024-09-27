const buttons = document.querySelectorAll("button");
const canvas = document.querySelector("#chart");
const host = "https://supervisor-system.onrender.com";
const loadIcon = document.querySelector(".spinner");

let chart = initialGraph(loadIcon);

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
      	chart.destroy();
      	
      	loadIcon.hidden = false;
      
        response = await fetch(`${host}/frontend/daily/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        loadIcon.hidden = true;

        chart = new Chart(canvas, generateDailyChartConfig(values));
        break;

      case "weekly":
        chart.destroy();
        
        loadIcon.hidden = false;
        
        response = await fetch(`${host}/frontend/weekly/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        loadIcon.hidden = true;

        chart = new Chart(canvas, generateWeeklyGraphConfig(values));
        break;

      case "monthly":
        chart.destroy();
        
        loadIcon.hidden = false;
        
        response = await fetch(`${host}/frontend/monthly/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        loadIcon.hidden = true;

        chart = new Chart(canvas, generateMonthlyChartConfig(values));
        break;

      case "annual":
      	chart.destroy();
        
        loadIcon.hidden = false;
        
        response = await fetch(`${host}/frontend/annual/${date}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        values = await response.json();

        loadIcon.hidden = true;

        chart = new Chart(canvas, generateAnnualGraphConfig(values));
        break;

      default:
        break;
    }
  });
});

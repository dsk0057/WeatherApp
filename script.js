function runClock() {
  const canvas = document.getElementById("analog_clock");
  //Method for drawing 2d canvas object
  var context = canvas.getContext("2d");
  var clockRadius = canvas.width / 2;

  //Drawing clock
  context.beginPath();
  context.fillStyle = "black";
  context.arc(clockRadius, clockRadius, clockRadius, 0, 2 * Math.PI);
  context.fill();

  //Styling the number
  context.font = "italic bold 1rem Roboto";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";

  //Adding a number around the circle
  for (let index = 1; index <= 12; index++) {
    //Dont ask me bro...google it
    context.fillText(
      index,
      clockRadius + clockRadius * 0.9 * Math.sin((index * 2 * Math.PI) / 12),
      clockRadius - clockRadius * 0.9 * Math.cos((index * 2 * Math.PI) / 12)
    );
  }
  //Creating a center white  circle
  context.beginPath();
  context.arc(clockRadius, clockRadius, 5, 0, 2 * Math.PI);
  context.fill();

  //Getting the date and time and saving on variable for the use on clock
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  //Get hours gives you hours in 24 hours
  const fullHours = (hours % 12) + minutes / 60 + seconds / 3600;

  const hoursAngle = (fullHours * 2 * Math.PI) / 12;
  const minutesAngle = (minutes * 2 * Math.PI) / 60;
  const secondsAngle = (seconds * 2 * Math.PI) / 60;

  //Drawing hours hand, minutes hand, second hand
  context.strokeStyle = "white";
  drawHands(hoursAngle, hoursAngle, 0.6, 5);
  drawHands(minutesAngle, minutesAngle, 0.8, 3);
  drawHands(secondsAngle, secondsAngle, 0.9, 2);

  //Function to draw hands on a clock
  function drawHands(sinAngle, cosAngle, num, lineWidth) {
    context.moveTo(clockRadius, clockRadius);
    context.lineTo(
      clockRadius + clockRadius * num * Math.sin(sinAngle),
      clockRadius - clockRadius * num * Math.cos(cosAngle)
    );
    context.lineWidth = lineWidth;
    context.stroke();
  }
}
setInterval(runClock, 1000);

// script for weather app

const apiKey = "fa5d040af9254b09862fe801f0e26f5f";

document
  .querySelector(".material-symbols-outlined")
  .addEventListener("click", (e) => {
    e.preventDefault();

    const userInput = document.querySelector("#search_input").value;
    const weatherApiUrl = `https://api.weatherbit.io/v2.0/current?&city=${userInput}&units=I&key=${apiKey}`;

    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const loc = data.data[0]["city_name"];
        const icon = data.data[0].weather.icon;
        const temp = data.data[0].temp;
        const desc = data.data[0].weather.description;
        const apparentTemp = data.data[0].app_temp;
        const humidity = data.data[0].rh;

        document.getElementById("location").innerText = loc;
        document.querySelector(
          ".icon"
        ).src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        document.getElementById("temperature").innerHTML = `${temp}°F`;
        document.getElementById("description").innerText = desc;
        document.getElementById(
          "appTemp"
        ).innerText = `Feels like: ${apparentTemp}°F`;
        document.getElementById("humidity").innerText = `Humidity: ${humidity}`;
      });
  });

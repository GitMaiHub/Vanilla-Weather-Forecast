// Create formatDate function to receive timestamp data
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`; // add 0 before hours (eg. 07:20 instead of 7:20)
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; // add 0 before minutes (eg. 17:07 instead of 17:7)
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; // must define all the "days" from Sunday before defining "day" in order not to get a number instead
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// Create formatDay function to receive data for weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}
// Create displayForecast function to take care of 5-day forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="forecast row">`; // store data from index.html
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  forecast.forEach(function (forecastDay, index) {
    // use loop to display different days, index returns days in numbers
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
            <div class="forecast-time">
              ${formatDay(forecastDay.dt)}
            </div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}\u00B0</span>
              <span class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}\u00B0</span>
            </div>
          </div>
        `; // data from index.html
    } // closing the if argument
  });
  forecastHTML = forecastHTML + `</div>`; // closing forecastHTML
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "eb2ee96fce77dd8a4eaad97e550c01d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// Create displayTemperature function that pulls data from OpenWeatherMap
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature"); // selecting temperature that alters
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature); // pull the data of the city entered from OpenWeatherMap
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000); // using formatDate task to get today's date
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  ); // pull weather icon from OpenWeatherMap, using icon url and interpolate the data set in "number+d"
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
// Create search function to receive a city, invoking AJAX call
function search(city) {
  let apiKey = "eb2ee96fce77dd8a4eaad97e550c01d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
// Invoke handleSubmit function when the search-form is submitted
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Honolulu"); // display default city

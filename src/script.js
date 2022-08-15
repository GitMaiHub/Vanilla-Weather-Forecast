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
// Take care of temperature conversion from Celsius to Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active"); // when F degree is shown, C link does not appear active
  fahrenheitLink.classList.add("active"); // when F degree is shown, F link appears active
  let fahrenheitTemperature = Math.round(celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature"); // recalling temperatureElement in order to convert celsius to fahrenheit
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active"); // when C degree is shown, C link appears active
  fahrenheitLink.classList.remove("active"); // when C degree is shown, F link does not appear active
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); // celsius temperature is the same as temperatureElement
}

// form, fahrenheitLink, celsiusLink are global variables which are accessible from inside functions above
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Seattle"); // display default city

let now = new Date();

let todayDate = document.querySelector("#today-date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

todayDate.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
let mainIcon = document.querySelector("#main-icon");
let farenheitLink = document.querySelector("#fahrenheit-button");
farenheitLink.addEventListener("click", displayFarenheit);
let celsiusTemperature = null;
let mainTemp = document.querySelector("#main-temperature");
let temperature = mainTemp.innerHTML;
let celsiusLink = document.querySelector("#celsius-button");
celsiusLink.addEventListener("click", displayCelsius);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
            
              <div class="weather-forecast-date"><strong>${formatDay(
                forecastDay.dt
              )}</strong></div>
             
              <img
                class="weekly-icon"
                src="images/weather1/${forecastDay.weather[0].icon}.png"
                alt=""
                width="100px"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max">${Math.round(
                  forecastDay.temp.max
                )}&deg</span> /
              <span class="weather-forecast-temperatures-min">${Math.round(
                forecastDay.temp.min
              )}&deg</span>


              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ecdfc99638105d33f56972e50bcc57cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-summary").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#maximum").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minimum").innerHTML = Math.round(
    response.data.main.temp_min
  );
  mainIcon.setAttribute(
    "src",
    `images/weather1/${response.data.weather[0].icon}.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ecdfc99638105d33f56972e50bcc57cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "ecdfc99638105d33f56972e50bcc57cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFarenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temperature");
  let temperature = mainTemp.innerHTML;
  mainTemp.innerHTML = `${Math.round((celsiusTemperature * 9) / 5 + 32)}`;
}

function displayCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temperature");
  mainTemp.innerHTML = Math.round(celsiusTemperature);
}

searchCity("Sydney");

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

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

todayDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;

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
    response.data.weather[0].main;

  document.querySelector("#maximum").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minimum").innerHTML = Math.round(
    response.data.main.temp_min
  );
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");

// Code from previous activity below
// F conversion and display in main

function displayFarenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temperature");
  let temperature = mainTemp.innerHTML;
  mainTemp.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
}

let farenheitLink = document.querySelector("#fahrenheit-button");
farenheitLink.addEventListener("click", displayFarenheit);

// C conversion and display in main

function displayCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temperature");
  mainTemp.innerHTML = "26";
}

let mainTemp = document.querySelector("#main-temperature");
let temperature = mainTemp.innerHTML;

let celsiusLink = document.querySelector("#celsius-button");
celsiusLink.addEventListener("click", displayCelsius);

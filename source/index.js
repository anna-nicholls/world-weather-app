let now = new Date();

let todayDate = document.querySelector("#today-date");

let hours = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tueusday",
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

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#form-input");
  console.log(input.value);

  let h2 = document.querySelector("h2");
  h2.innerHTML = input.value;
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", displayCity);

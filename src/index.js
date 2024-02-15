function formSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-search");

  searchCity(cityInput.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", formSearch);

function searchCity(response) {
  let apiKey = `d37e0bate3co638094f17bb45fdb3101`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${response}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCurrentTemp);
}

function changeCurrentTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = response.data.city;
  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.condition.description;
  updateDate(response);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
}

function updateDate(response) {
  let currentTime = new Date(response.data.time * 1000);
  let daySelector = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daySelector[currentTime.getDay()];
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let time = document.querySelector("#time");
  time.innerHTML = `${day} ${hours}:${minutes}`;
}
searchCity("melbourne");

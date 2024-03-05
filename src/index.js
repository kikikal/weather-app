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
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src = "${response.data.condition.icon_url}" class = "icon"/>`;
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

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                  />
                  <div class="weather-forecast-temps">
                    <span class="weather-forecast-max">20°C</span>
                    <span class="weather-forecast-min">12°C</span>
                  </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

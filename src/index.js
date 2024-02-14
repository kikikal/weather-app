function formSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-search");
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = cityInput.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", formSearch);


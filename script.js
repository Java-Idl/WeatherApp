const apiKey = "812f5f19057321ad95af381ef38634e2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector('.input');
const searchButton = document.querySelector('.search-button');
const weatherDiv = document.querySelector('.weather');

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.error("Geolocation is not supported by this browser.");
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  checkWeather(latitude, longitude);
}

function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
}

function updateStats(data) {
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
  document.querySelector('.wind').innerHTML = data.wind.speed.toFixed(2) + " km/h";
  weatherDiv.classList.add('is-loaded');
}

async function checkWeather(arg1, arg2) {
  let response;
  if (typeof arg1 === 'string') {
    response = await fetch(`${apiUrl}&q=${arg1}&appid=${apiKey}`);
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    response = await fetch(`${apiUrl}&lat=${arg1}&lon=${arg2}&appid=${apiKey}`);
  } else {
    throw new Error("Invalid arguments.");
  }

  var data = await response.json();
  console.log(data);
  updateStats(data);
}

searchButton.addEventListener('click', () => {
  checkWeather(searchBox.value, NaN);
});

searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkWeather(searchBox.value, NaN);
  }
});
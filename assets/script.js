const apiKey = "856f151574afa21ec0ca598f9500c70d";

// Get modal elements
const modal = document.getElementById("alertModal");
const closeButton = document.querySelector(".close-btn");
const alertMessage = document.getElementById("alertMessage");

// Function to show the custom alert modal
function showAlert(message) {
  alertMessage.textContent = message; // Set the alert message text
  modal.style.display = "flex"; // Show the modal by changing display
}

// Function to close the modal when the close button is clicked
closeButton.onclick = function () {
  modal.style.display = "none";
};

// Close the modal if clicked outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Add event listener for form submission
document
  .getElementById("citySearchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = document.getElementById("cityNameInput").value.trim();
    if (cityName) {
      getWeatherData(cityName);
    }
  });

// Fetch weather data using city name
function getWeatherData(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const { coord, name } = data;
        saveSearchHistory(name);
        displayCurrentWeather(data);
        getWeatherForecast(coord.lat, coord.lon);
      } else {
        showAlert("City not found! Please try again."); // Show modal if city is not found
      }
    })
    .catch((error) => {
      showAlert("Error fetching weather data. Please try again later."); // Show modal on fetch error
      console.error("Error fetching weather data:", error);
    });
}

// Fetch 5-day weather forecast
function getWeatherForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => displayForecast(data))
    .catch((error) => console.error("Error fetching forecast data:", error));
}

// Display current weather
function displayCurrentWeather(data) {
  const { name, main, weather, wind } = data;
  const weatherDiv = document.getElementById("weatherDisplay");
  weatherDiv.innerHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <p>${new Date().toLocaleDateString()}</p>
      <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${
    weather[0].description
  }">
      <p>Temperature: ${main.temp} °C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    </div>
  `;
}

// Display 5-day forecast
function displayForecast(data) {
  const forecastDiv = document.getElementById("forecastDisplay");
  forecastDiv.innerHTML = "<h2>5-Day Forecast</h2>";

  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const icon = item.weather[0].icon;
      forecastDiv.innerHTML += `
        <div class="weather-card">
          <p>${date}</p>
          <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${item.weather[0].description}">
          <p>Temp: ${item.main.temp} °C</p>
          <p>Humidity: ${item.main.humidity}%</p>
        </div>
      `;
    }
  });
}

// Save search history
function saveSearchHistory(city) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    updateSearchHistory();
  }
}

// Update search history display
function updateSearchHistory() {
  const historyList = document.getElementById("searchHistoryList");
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyList.innerHTML = "";
  history.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => getWeatherData(city));
    historyList.appendChild(li);
  });
}

// Initialize search history on page load
document.addEventListener("DOMContentLoaded", updateSearchHistory);

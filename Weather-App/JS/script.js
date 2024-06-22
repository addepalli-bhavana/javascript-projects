// API key for accessing OpenWeatherMap API
const apiKey = "e569d2ef6f091be2dcc1efe684f0bed5";

// reference to html elements
const getBtnElement = document.getElementById("get-btn");
const inputTextElement = document.getElementById("input-text");
const weatherInfoElement = document.getElementById("weather-info");
const weatherIconElement = document.getElementById("weather-icon");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const feelElement = document.getElementById("feel");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

// function to display weather information on UI
const displayWeatherInfo = (data) => {
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  temperatureElement.innerText = `${Math.round(data.main.temp)} °c`;
  descriptionElement.innerText = data.weather[0].description;
  feelElement.innerText = `feels like: ${Math.round(data.main.feels_like)} °c`;
  humidityElement.innerText = `humidity: ${data.main.humidity}%`;
  windSpeedElement.innerText = `wind speed: ${data.wind.speed} m/s`;
  weatherInfoElement.classList.remove("hide");
};

// function to fetch weather data from OpenWeatherMap API
const getWeather = async () => {
  const inputText = inputTextElement.value.trim();
  if (!inputText) {
    alert("Please enter a city name");
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    displayWeatherInfo(data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// function to clear weather information on the UI
const resetWeatherInfo = () => {
  weatherInfoElement.classList.add("hide");
  weatherIconElement.src = "";
  temperatureElement.innerText = "";
  descriptionElement.innerText = "";
  feelElement.innerText = "";
  humidityElement.innerText = "";
  windSpeedElement.innerText = "";
};

// event listener for get weather button
getBtnElement.addEventListener("click", getWeather);

// event listener for keyup in the input field to clear weather information on UI if no input
inputTextElement.addEventListener("keyup", () => {
  if (!inputTextElement.value.trim()) {
    resetWeatherInfo();
  }
});

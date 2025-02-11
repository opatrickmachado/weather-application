const cityForm = document.querySelector('[data-js="change-location"]');
const cityNameContainer = document.querySelector('[data-js="city-name"]');
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]');
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
);
const cityCard = document.querySelector('[data-js="city-card"]');
let timeImg = document.querySelector('[data-js="time"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');

cityForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const inputValue = event.target.city.value.trim();
    if (!inputValue) return;

    const cityData = await getCityData(inputValue);
    if (!cityData) {
      throw new Error("Cidade não encontrada");
    }

    const { Key, LocalizedName } = cityData;
    const weatherData = await getCityWeather(Key);

    if (!weatherData) {
      throw new Error("Dados climáticos não disponíveis");
    }

    const { WeatherText, Temperature, IsDayTime, WeatherIcon } = weatherData;
    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`;

    cityCard.classList.remove("d-none");
    timeImg.src = IsDayTime ? "./src/day.svg" : "./src/night.svg";
    timeIconContainer.innerHTML = timeIcon;
    cityNameContainer.textContent = LocalizedName;
    cityWeatherContainer.textContent = WeatherText;
    cityTemperatureContainer.textContent = Temperature.Metric.Value;

    cityForm.reset();
  } catch (error) {
    alert(error.message);
    cityCard.classList.add("d-none");
  }
});

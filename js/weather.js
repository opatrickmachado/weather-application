const APIkey = "GXt3zZdeTCdojh0P5VrdOv4NdiwCScRy";

const getCityUrl = (cityName) =>
  `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIkey}&q=${cityName}`;

const getCityData = async (cityName) => {
  try {
    const cityUrl = getCityUrl(cityName);
    const response = await fetch(cityUrl);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados");
    }

    const data = await response.json();
    console.log("City Data:", data);
    const [cityData] = data;
    return cityData;
  } catch (error) {
    console.error("Error fetching city data:", error);
    alert(`${error.name}: ${error.message}`);
  }
};

const getCityWeather = async (Key) => {
  try {
    const cityWeatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIkey}`;
    const response = await fetch(cityWeatherUrl);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados");
    }

    const data = await response.json();
    console.log("Weather Data:", data);
    const [cityWeatherData] = data;
    return cityWeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(`${error.name}: ${error.message}`);
  }
};

import { fetchWeather } from "../src/api/WeatherService.js";

const getWeatherCondition = (weatherCode) => {
  const weatherConditions = {
    0: { condition: "Clear sky", icon: "☀️" },
    1: { condition: "Mainly clear", icon: "🌤️" },
    2: { condition: "Partly cloudy", icon: "⛅" },
    3: { condition: "Overcast", icon: "☁️" },
    45: { condition: "Fog", icon: "🌫️" },
    48: { condition: "Depositing rime fog", icon: "🌫️" },
    51: { condition: "Drizzle: Light", icon: "🌦️" },
    53: { condition: "Drizzle: Moderate", icon: "🌦️" },
    55: { condition: "Drizzle: Dense", icon: "🌧️" },
    61: { condition: "Rain: Slight", icon: "🌧️" },
    63: { condition: "Rain: Moderate", icon: "🌧️" },
    65: { condition: "Rain: Heavy", icon: "🌧️" },
    71: { condition: "Snow: Slight", icon: "🌨️" },
    73: { condition: "Snow: Moderate", icon: "🌨️" },
    75: { condition: "Snow: Heavy", icon: "❄️" },
    80: { condition: "Rain shower(s): Slight", icon: "🌦️" },
    81: { condition: "Rain shower(s): Moderate or Heavy", icon: "🌧️" },
    82: { condition: "Rain shower(s): Violent", icon: "🌧️" },
    83: { condition: "Rain and snow shower(s): Slight", icon: "🌨️" },
    84: { condition: "Rain and snow shower(s): Moderate or Heavy", icon: "🌨️" },
    85: { condition: "Snow shower(s): Slight", icon: "🌨️" },
    86: { condition: "Snow shower(s): Moderate or Heavy", icon: "❄️" },
    87: {
      condition: "Snow pellets or small hail shower(s): Slight",
      icon: "🌨️",
    },
    88: {
      condition: "Snow pellets or small hail shower(s): Moderate or Heavy",
      icon: "❄️",
    },
    89: { condition: "Hail shower(s): Slight", icon: "🌩️" },
    90: { condition: "Hail shower(s): Moderate or Heavy", icon: "🌩️" },
    95: { condition: "Thunderstorm: Slight or Moderate", icon: "⛈️" },
    96: { condition: "Thunderstorm with hail: Slight or Moderate", icon: "⛈️" },
    97: { condition: "Thunderstorm: Heavy", icon: "🌩️" },
    98: { condition: "Thunderstorm with duststorm or sandstorm", icon: "🌪️" },
    99: { condition: "Thunderstorm with heavy hail", icon: "🌩️" },
  };

  return weatherConditions[weatherCode] || { condition: "Unknown", icon: "❓" };
};

document
  .getElementById("city-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    if (!city) return;

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "Loading...";

    try {
      const weatherData = await fetchWeather(city);

      // Log the weather data to debug
      console.log("Weather Data:", weatherData);

      // Format the date
      const formatDate = (dateString) => {
        // Treat the date as UTC
        const date = new Date(`${dateString}T00:00:00Z`);
        return new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
          .format(date)
          .replace(", ", "\n");
      };

      forecastDiv.innerHTML = weatherData
        .map((day) => {
          const { condition, icon } = getWeatherCondition(day.weatherCode);
          return `
      <div class="forecast-card">
        <p><strong>${formatDate(day.date)}</strong></p>
        <p>${icon} <strong>${condition}</strong></p>
        <p><strong>Max Temp:</strong> ${day.maxTemp}°C</p>
        <p><strong>Min Temp:</strong> ${day.minTemp}°C</p>
        <p><strong>Precipitation:</strong> ${day.precipitation} mm</p>
      </div>
    `;
        })
        .join("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      forecastDiv.innerHTML = "Error fetching weather data. Please try again.";
    }
  });

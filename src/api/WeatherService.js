const OPEN_CAGE_API_KEY = "9652010e220a49faa3463109439e029b"; // Replace with your OpenCage API key
const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(city) {
  // Step 1: Get coordinates from OpenCageData
  const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    city
  )}&key=${OPEN_CAGE_API_KEY}`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) {
    throw new Error("Failed to fetch city coordinates");
  }
  const geoData = await geoResponse.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }
  const { lat, lng } = geoData.results[0].geometry;

  // Step 2: Get weather data from Open-Meteo
  const weatherUrl = `${OPEN_METEO_BASE_URL}?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const weatherData = await weatherResponse.json();

  // Step 3: Format the weather data
  return weatherData.daily.time.map((date, index) => ({
    date,
    maxTemp: weatherData.daily.temperature_2m_max[index],
    minTemp: weatherData.daily.temperature_2m_min[index],
    precipitation: weatherData.daily.precipitation_sum[index],
    weatherCode: weatherData.daily.weathercode[index], // Add weather code
  }));
}

# Weather Forecast Website

This project provides a 7-day weather forecast for major European cities using the Open-Meteo and OpenCageData APIs.

## Features
- Search for a city to get its weather forecast.
- Displays weather data in a user-friendly format, including:
  - Maximum and minimum temperatures
  - Precipitation levels

## How to Run
1. Clone the repository.
2. Replace `your-opencage-api-key` in `WeatherService.js` with your OpenCage API key.
3. Open the `public/index.html` file in a browser or use a local server.
4. Enter a city name to view the forecast.

## Deployment
The website is deployed at: [Your Deployment Link]

weather-app-3/
├── index.html
├── public/
│   ├── styles.css
│   └── script.js
├── src/
│   ├── api/
│   │   └── WeatherService.js
│   └── utils/
│       └── helpers.js
├── package.json
└── Readme.md
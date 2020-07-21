// API Docs: https://openweathermap.org/api

const axios = require('axios');
const express = require('express');

const app = module.exports = express();
const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
const version = '2.5';
const baseURL = 'https://api.openweathermap.org/data';
const temperatureUnit = 'metric';

// const currentWeather = params =>
//   axios.get(
//     `${baseURL}/${version}/weather`,
//     { params: { appid: apiKey, units: temperatureUnit, ...params } }
//   );

app.get('/api/weather/onecall', async (req, res) => {
  console.log(req.query)

  const { data } = await axios.get(
    `${baseURL}/${version}/onecall`,
    { params: { appid: apiKey, units: temperatureUnit, exclude: 'minutely', ...req.query } }
  );

  console.log(data)

  res.send(data);
});

// export default {
//   currentWeather,
//   oneCall,
//   getIcon,
//   usePreloadedIcons
// };
// export default {
//   app
// };

// API Docs: https://openweathermap.org/api

const axios = require('axios');
const express = require('express');

const app = module.exports = express();
const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
const version = '2.5';
const baseURL = 'https://api.openweathermap.org/data';
const temperatureUnit = 'metric';

app.get('/api/weather/current', async (req, res) => {
  const { data } = await axios.get(
    `${baseURL}/${version}/weather`,
    { params: { appid: apiKey, units: temperatureUnit, ...req.query } }
  );
  res.send(data);
});

app.get('/api/weather/onecall', async (req, res) => {
  const { data } = await axios.get(
    `${baseURL}/${version}/onecall`,
    { params: { appid: apiKey, units: temperatureUnit, exclude: 'minutely', ...req.query } }
  );
  res.send(data);
});

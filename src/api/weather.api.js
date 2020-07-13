import axios from 'axios';

const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
const version = '2.5';
const baseURL = 'http://api.openweathermap.org/data';
const temperatureUnit = 'metric';

const currentWeather = params =>
  axios.get(
    `${baseURL}/${version}/weather`,
    { params: { appid: apiKey, units: temperatureUnit, ...params } }
  );

const getIcon = code => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default {
  currentWeather,
  getIcon
};

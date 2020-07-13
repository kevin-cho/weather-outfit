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

const oneCall = params =>
  axios.get(
    `${baseURL}/${version}/onecall`,
    { params: { appid: apiKey, units: temperatureUnit, exclude: 'minutely', ...params } }
  );

const getIcon = (code, size = 'small') => `http://openweathermap.org/img/wn/${code}${size === 'large' ? '@2x' : ''}.png`;

export default {
  currentWeather,
  oneCall,
  getIcon
};

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const WeatherAPI = require('./src/api/weather.api');
const LocationAPI = require('./src/api/location.api');

const app = express();
const port = process.env.PORT || 5000;

const apiKey = process.env.LOCATION_IQ_API_KEY;
const version = '1';
const baseURL = 'https://api.locationiq.com';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(WeatherAPI);
app.use(LocationAPI);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
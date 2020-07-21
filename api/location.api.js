// API Docs: https://locationiq.com/docs#autocomplete

const axios = require('axios');
const express = require('express');

const app = module.exports = express();
const apiKey = process.env.LOCATION_IQ_API_KEY;
const version = '1';
const baseURL = 'https://api.locationiq.com';

app.get('/api/location', async (req, res) => {
  console.log('-------------------', apiKey, req.query)
  const { data } = await axios.get(
    `${baseURL}/v${version}/autocomplete.php`,
    { params: { key: apiKey, tag: 'place:city', ...req.query } }
  );
  res.send(data);
});

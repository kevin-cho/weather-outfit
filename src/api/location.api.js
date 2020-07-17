// API Docs: https://locationiq.com/docs#autocomplete

import axios from 'axios';

const apiKey = process.env.REACT_APP_LOCATION_IQ_API_KEY;
const version = '1';
const baseURL = 'https://api.locationiq.com';

const autocomplete = ({ query: q, ...params}) =>
  axios.get(
    `${baseURL}/v${version}/autocomplete.php`,
    { params: { key: apiKey, q, tag: 'place:city', ...params } }
  );

export default {
  autocomplete
};

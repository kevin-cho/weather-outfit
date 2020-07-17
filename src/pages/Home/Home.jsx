import React, { useState } from 'react';
import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { WeatherAPI, LocationAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';
import HourlyTemperature from '../../components/HourlyTemperature';
import DailyTemperature from '../../components/DailyTemperature';
import FadedEdge from '../../components/FadedEdge';
import { Fade, Slide } from '../../components/Transitions';
import RippleButton from '../../components/RippleButton';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './Home.module.scss';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const hourlyData = _.get(weather, 'hourly', []).slice(1, 25);
  const dailyData = _.get(weather, 'daily', []).slice(1, 8);

  const handleSubmit = async val => {
    if (_.isEmpty(val)) return;

    const [{ lat, lon }] = val;
    const { data } = await WeatherAPI.oneCall({ lat, lon, units: unit });

    setWeather(data);
    setSelected(val);
  };

  const handleUnitChange = async val => {
    const [{ lat, lon }] = selected;
    const { data } = await WeatherAPI.oneCall({ lat, lon, units: val });

    setWeather(data);
    setUnit(val);
  };

  const handleSearch = async query => {
    setLoading(true);
    const { data = [] } = await LocationAPI.autocomplete({ query });
    setLoading(false);

    const uniqueData = _.uniqBy(data, ({ address }) => `${address.name}, ${address.country}`);
    const options = uniqueData.map(({ address, lat, lon }) => ({ label:  `${address.name}, ${address.country}`, lat, lon }));

    setCities(options);
  };

  WeatherAPI.usePreloadedIcons();

  return (
    <div>
      <RippleButton onClick={() => setWeather({})} icon="clear" round />

      <AsyncTypeahead
        className="mb-4"
        id="city-search"
        isLoading={loading}
        onSearch={handleSearch}
        onChange={selected => handleSubmit(selected)}
        options={cities}
      />

      <Fade in={!_.isEmpty(weather)}>
        <CurrentTemperature
          className={styles.currentTemperature}
          handleChange={val => handleUnitChange(val)}
          icon={WeatherAPI.getIcon(_.get(weather, 'current.weather[0].icon'), 'large')}
          temperature={_.get(weather, 'current.temp')}
          unit={unit}
          description={_.get(weather, 'current.weather[0].description')}
        />
      </Fade>
      
      <Slide in={!_.isEmpty(weather)} direction="left">
        <FadedEdge position="right" className="mb-5">
          <div className={styles.temperatureStrip}>
            {hourlyData.map(data => (
              <HourlyTemperature
                key={data.dt}
                icon={WeatherAPI.getIcon(data.weather[0].icon)}
                temperature={data.temp}
                hour={new Date(data.dt * 1000).getHours()}
                description={data.weather[0].description}
              />
            ))}
          </div>
        </FadedEdge>
      </Slide>

      <Slide in={!_.isEmpty(weather)} direction="right">
        <div className={styles.temperatureStrip}>
          {dailyData.map(data => (
            <DailyTemperature
              key={data.dt}
              icon={WeatherAPI.getIcon(data.weather[0].icon)}
              highTemperature={data.temp.max}
              lowTemperature={data.temp.min}
              day={new Date(data.dt * 1000).getDay()}
              description={data.weather[0].description}
            />
          ))}
        </div>
      </Slide>
    </div>
  );
};

export default Home;

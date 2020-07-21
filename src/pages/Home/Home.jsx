import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { getIcon, usePreloadedIcons } from '../../api/weather.helpers';
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
  const [selected, setSelected] = useState([]);
  const hourlyData = _.get(weather, 'hourly', []).slice(1, 25);
  const dailyData = _.get(weather, 'daily', []).slice(1, 8);

  const handleSubmit = async val => {
    if (_.isEmpty(val)) return;

    const [{ lat, lon }] = val;
    const { data } = await axios.get(
      '/api/weather/onecall',
      { params: { lat, lon, units: val } }
    );

    setWeather(data);
    setSelected(val);
  };

  const handleUnitChange = async val => {
    const [{ lat, lon }] = selected;
    const { data } = await axios.get(
      '/api/weather/onecall',
      { params: { lat, lon, units: val } }
    );

    setWeather(data);
    setUnit(val);
  };

  const handleSearch = async query => {
    const { data = [] } = await axios.get(
      '/api/location',
      { params: { q: query, limit: 5 } }
    );
    const getLabel = ({ address }) => `${address.name}, ${address.state}, ${address.country}`;

    const uniqueData = _.uniqBy(data, getLabel);
    const options = uniqueData.map(({ lat, lon, ...rest }) => ({ label: getLabel(rest), lat, lon }));

    setCities(options);
  };

  usePreloadedIcons();

  return (
    <div>
      <RippleButton onClick={() => setWeather({})} icon="clear" round />

      <AsyncTypeahead
        className="mb-4"
        id="city-search"
        isLoading={false}
        onSearch={handleSearch}
        onChange={selected => handleSubmit(selected)}
        options={cities}
        placeholder="Search for a city"
      />

      <Fade in={!_.isEmpty(weather)}>
        <CurrentTemperature
          className={styles.currentTemperature}
          handleChange={val => handleUnitChange(val)}
          icon={getIcon(_.get(weather, 'current.weather[0].icon'), 'large')}
          temperature={_.get(weather, 'current.temp')}
          unit={unit}
          description={_.get(weather, 'current.weather[0].description')}
        />
        
        <span
          className="material-icons"
          style={{ transform: `rotate(${_.get(weather, 'current.wind_deg', 0) + 180}deg)` }}
        >
          north
        </span>
        Wind <span>{Math.round(_.get(weather, 'current.wind_speed', 0) * 3.6)} km/h</span>

        Humidity <span>{Math.round(_.get(weather, 'current.humidity', 0))}%</span>

        Rain <span>{Math.round(_.get(weather, 'current.rain', 0))}%</span>
      </Fade>
      
      <Slide in={!_.isEmpty(weather)} direction="left">
        <FadedEdge position="right" className="mb-5">
          <div className={styles.temperatureStrip}>
            {hourlyData.map(data => (
              <HourlyTemperature
                key={data.dt}
                icon={getIcon(data.weather[0].icon)}
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
              icon={getIcon(data.weather[0].icon)}
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

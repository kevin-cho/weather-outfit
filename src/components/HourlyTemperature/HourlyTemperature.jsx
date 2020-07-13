import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './HourlyTemperature.css';

const propTypes = {
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

const HourlyTemperature = ({ icon, temperature, hour, description }) => (
  <div className="HourlyTemperature">
    <div>{hour}:00</div>
    <img src={icon} title={_.capitalize(description)} />
    <div>{Math.round(temperature)}°</div>
  </div>
);

HourlyTemperature.propTypes = propTypes;

export default HourlyTemperature;

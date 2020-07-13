import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './DailyTemperature.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const propTypes = {
  icon: PropTypes.string.isRequired,
  highTemperature: PropTypes.number.isRequired,
  lowTemperature: PropTypes.number.isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  description: PropTypes.string.isRequired
};

const DailyTemperature = ({ icon, highTemperature, lowTemperature, day, description }) => (
  <div className="DailyTemperature">
    <div>{_.isNumber(day) ? days[day] : day}</div>
    <img src={icon} title={_.capitalize(description)} />
    <div className="temperatures">
      <span>{Math.round(highTemperature)}°</span> <span>{Math.round(lowTemperature)}°</span>
    </div>
  </div>
);

DailyTemperature.propTypes = propTypes;

export default DailyTemperature;

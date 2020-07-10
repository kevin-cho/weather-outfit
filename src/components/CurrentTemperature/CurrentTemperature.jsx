import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from 'react-bootstrap';
import './CurrentTemperature.css';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric']).isRequired
};

const CurrentTemperature = ({ handleChange, icon, temperature, unit }) => {
  if (!temperature) return null;
  
  return (
    <div className="CurrentTemperature">
      <img src={icon} alt="weather icon" />
      <h1 className="mr-3">{Math.round(temperature)}</h1>

      <InputGroup>
        <InputGroup.Prepend>
          <Button onClick={() => handleChange('metric')} variant={unit === 'metric' ? 'dark' : 'light'}>°C</Button>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <Button onClick={() => handleChange('imperial')} variant={unit === 'imperial' ? 'dark' : 'light'}>°F</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

CurrentTemperature.propTypes = propTypes;

export default CurrentTemperature;

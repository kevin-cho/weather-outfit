import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import styles from './CurrentTemperature.module.scss';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.number,
  unit: PropTypes.oneOf(['imperial', 'metric']).isRequired,
  description: PropTypes.string,
  className: PropTypes.string
};

const CurrentTemperature = ({ handleChange, icon, temperature, unit, description, className }) => {
  if (!temperature) return null;
  
  return (
    <div className={`${styles.currentTemperature} ${className}`}>
      <img src={icon} alt="weather icon" title={_.capitalize(description)} />
      <h1 className="mr-3">{Math.round(temperature)}°</h1>

      <InputGroup>
        <InputGroup.Prepend>
          <Button type="submit" onClick={() => handleChange('metric')} variant={unit === 'metric' ? 'dark' : 'light'}>C</Button>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <Button type="submit" onClick={() => handleChange('imperial')} variant={unit === 'imperial' ? 'dark' : 'light'}>F</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

CurrentTemperature.propTypes = propTypes;

export default CurrentTemperature;

import React, { useState } from 'react';
import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { WeatherAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';
import HourlyTemperature from '../../components/HourlyTemperature';
import { Fade } from '../../components/Transitions';
import './Home.css';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');
  const hourlyData = _.chain(weather).get('hourly', []).slice(1, 25).value();

  const handleSubmit = async values => {
    const { data } = await WeatherAPI.oneCall({ lat: '33.441792', lon: '-94.037689', units: unit });
    setWeather(data);
  };

  console.log({hourlyData})

  return (
    <Formik initialValues={{ city: 'Toronto' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <InputGroup className="mb-5">
            <Field as={FormControl} placeholder="City" name="city" />
            <InputGroup.Append>
              <Button type="submit" disabled={isSubmitting} className="submitButton">
                {isSubmitting ? <Spinner animation="border" size="sm" /> : <span class="material-icons">keyboard_arrow_right</span>}
              </Button>
            </InputGroup.Append>
          </InputGroup>

          <Fade in={!_.isEmpty(weather)}>
            <>
              <CurrentTemperature
                className="centerContainer mb-4"
                handleChange={unit => setUnit(unit)}
                icon={WeatherAPI.getIcon(_.get(weather, 'current.weather[0].icon'), 'large')}
                temperature={_.get(weather, 'current.temp')}
                unit={unit}
                description={_.get(weather, 'current.weather[0].description')}
              />

              <div className="hourlyData">
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
            </>
          </Fade>
        </Form>
      )}
    </Formik>
  );
};

export default Home;

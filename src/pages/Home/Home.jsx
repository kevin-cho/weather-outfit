import React, { useState } from 'react';
import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { WeatherAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';
import HourlyTemperature from '../../components/HourlyTemperature';
import DailyTemperature from '../../components/DailyTemperature';
import FadedEdge from '../../components/FadedEdge';
import { Fade, Slide } from '../../components/Transitions';
import './Home.css';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');
  const hourlyData = _.get(weather, 'hourly', []).slice(1, 25);
  const dailyData = _.get(weather, 'daily', []).slice(1, 8);

  const handleSubmit = async values => {
    const { data } = await WeatherAPI.oneCall({ lat: '33.441792', lon: '-94.037689', units: unit });
    setWeather(data);
  };

  console.log({dailyData})

  return (
    <Formik initialValues={{ city: 'Toronto' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <InputGroup className="mb-5">
            <Field as={FormControl} placeholder="City" name="city" />
            <InputGroup.Append>
              <Button type="submit" disabled={isSubmitting} className="submitButton">
                {isSubmitting ? <Spinner animation="border" size="sm" /> : <span className="material-icons">keyboard_arrow_right</span>}
              </Button>
            </InputGroup.Append>
          </InputGroup>

          {/* <TransitionGroup className="test"> */}
          <Fade in={!_.isEmpty(weather)}>
            <CurrentTemperature
              className="centerContainer mb-4"
              handleChange={unit => setUnit(unit)}
              icon={WeatherAPI.getIcon(_.get(weather, 'current.weather[0].icon'), 'large')}
              temperature={_.get(weather, 'current.temp')}
              unit={unit}
              description={_.get(weather, 'current.weather[0].description')}
            />
          </Fade>
          
          <Slide in={!_.isEmpty(weather)} direction="left">
            <FadedEdge position="right" className="mb-5">
              <div className="temperatureStrip">
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
            <div className="temperatureStrip">
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
        </Form>
      )}
    </Formik>
  );
};

export default Home;

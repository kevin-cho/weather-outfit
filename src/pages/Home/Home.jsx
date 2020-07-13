import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { WeatherAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';
import { Fade } from '../../components/Transitions';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');

  const handleSubmit = async (values) => {
    const { data } = await WeatherAPI.currentWeather({ q: values.city, units: unit });
    setWeather(data);
  };

  return (
    <Formik initialValues={{ city: 'Toronto' }} onSubmit={handleSubmit}>
      {(props) => (
        <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <InputGroup className="mb-3">
            <Field as={FormControl} placeholder="City" name="city" />
            <InputGroup.Append>
              <Button type="submit">Search</Button>
            </InputGroup.Append>
          </InputGroup>

          <Fade in={!_.isEmpty(weather)}>
            <CurrentTemperature
              handleChange={unit => setUnit(unit)}
              icon={WeatherAPI.getIcon(_.get(weather, 'weather[0].icon'))}
              temperature={_.get(weather, 'main.temp')}
              unit={unit}
            />
          </Fade>
        </Form>
      )}
    </Formik>
  );
};

export default Home;

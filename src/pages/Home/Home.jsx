import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { WeatherAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');

  const handleSubmit = async (values) => {
    const { data } = await WeatherAPI.currentWeather({ q: values.city, units: unit });
    setWeather(data);
  };

  return (
    <div>
      <Formik initialValues={{ city: 'Toronto' }} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <InputGroup className="mb-3">
              <Field as={FormControl} placeholder="City" name="city" />
              <InputGroup.Append>
                <Button type="submit">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>

      <CurrentTemperature
        handleChange={setUnit}
        icon={`http://openweathermap.org/img/wn/${_.get(weather, 'weather[0].icon')}@2x.png`}
        temperature={_.get(weather, 'main.temp')}
        unit={unit}
      />
    </div>
  );
};

export default Home;

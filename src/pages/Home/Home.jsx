import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Field, Formik, Form } from 'formik';
import _ from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { WeatherAPI } from '../../api';
import CurrentTemperature from '../../components/CurrentTemperature';
import './Home.css';

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
          <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <InputGroup className="mb-3">
              <Field as={FormControl} placeholder="City" name="city" />
              <InputGroup.Append>
                <Button type="submit">Search</Button>
              </InputGroup.Append>
            </InputGroup>

            <CSSTransition
              in={!_.isEmpty(weather)}
              classNames="fade"
              timeout={300}
              unmountOnExit
            >
              <CurrentTemperature
                handleChange={async unit => {setUnit(unit); return handleSubmit(props.values)}}
                icon={`http://openweathermap.org/img/wn/${_.get(weather, 'weather[0].icon')}@2x.png`}
                temperature={_.get(weather, 'main.temp')}
                unit={unit}
              />
            </CSSTransition>
          </Form>
        )}
      </Formik>

      
    </div>
  );
};

export default Home;

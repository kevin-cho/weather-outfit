import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { WeatherAPI } from '../../api';

const Home = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await WeatherAPI.currentWeather({ q: 'Toronto' });
      setWeather(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      Home
      <Button variant="primary">Primary</Button>
    </div>
  );
};

export default Home;

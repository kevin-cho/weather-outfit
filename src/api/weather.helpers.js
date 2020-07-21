import { useEffect } from 'react';

export const getIcon = (code, size = 'small') => `http://openweathermap.org/img/wn/${code}${size === 'large' ? '@2x' : ''}.png`;

export const usePreloadedIcons = () => useEffect(() => {
  const codes = ['01', '02', '03', '04', '09', '10', '11', '13', '50'];
  const colours = ['d', 'n'];
  const sizes = ['small', 'large'];

  codes.forEach(code => {
    colours.forEach(colour => {
      sizes.forEach(size => {
        new Image().src = getIcon(code + colour, size);
      })
    })
  })
}, []);

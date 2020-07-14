import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Slide.css';

const propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down'])
};

const Slide = ({ direction = 'left', children, ...props }) => (
  <CSSTransition
    classNames={`slide-${direction}`}
    timeout={500}
    unmountOnExit
    {...props}
  >
    {/* Extra <div> allows transition to work on multiple children nodes */}
    <div>{children}</div>
  </CSSTransition>
);

Slide.propTypes = propTypes;

export default Slide;

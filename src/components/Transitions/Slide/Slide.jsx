import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Slide.css';

const Slide = ({ direction = 'left', ...props }) => (
  <CSSTransition
    classNames={`slide-${direction}`}
    timeout={500}
    unmountOnExit
    {...props}
  >
    {/* Extra <div> allows transition to work on multiple children nodes */}
    <div>
      {props.children}
    </div>
  </CSSTransition>
);

export default Slide;

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.css';

const Fade = props => (
  <CSSTransition
    classNames="fade"
    timeout={300}
    unmountOnExit
    {...props}
  >
    {props.children}
  </CSSTransition>
);

export default Fade;

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.css';

const Fade = ({ delay = 0, children, ...props }) => (
  <CSSTransition
    classNames="fade"
    timeout={300}
    unmountOnExit
    {...props}
  >
    {/* Extra <div> allows transition to work on multiple children nodes */}
    <div style={{ transitionDelay: `${delay}ms`}}>
      {children}
    </div>
  </CSSTransition>
);

export default Fade;

import React from 'react';
import classNames from 'classnames';
import './RippleButton.css';

const RippleButton = ({ children, icon = null, round = false, ...props }) => (
  <button className={classNames('RippleButton', { 'material-icons': icon, round })} {...props}>
    {icon ? icon : children}
  </button>
);

export default RippleButton;

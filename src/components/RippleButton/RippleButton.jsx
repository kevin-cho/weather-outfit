import React from 'react';
import classNames from 'classnames';
import styles from './RippleButton.module.scss';

const RippleButton = ({ children, icon = null, round = false, ...props }) => (
  <button
    className={classNames(
      styles.rippleButton,
      { 'material-icons': icon, [styles.round]: round }
    )}
    {...props}
  >
    {icon ? icon : children}
  </button>
);

export default RippleButton;

import React from 'react';
import classNames from 'classnames';
import styles from './FadedOverlay.module.scss';

const FadedOverlay = ({
  component: Component = () => <div />,
  show = true,
  className = '',
  children,
  ...props
}) => (
  <Component
    className={classNames(
      { [styles.show]: show },
      styles.fadedOverlay,
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export default FadedOverlay;

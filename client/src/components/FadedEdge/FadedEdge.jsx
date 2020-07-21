import React from 'react';
import PropTypes from 'prop-types';
import styles from './FadedEdge.module.scss';

const propTypes = {
  position: PropTypes.oneOf(['left', 'right'])
};

const FadedEdge = ({ position = 'right', children, className }) => (
  <div className={`${styles.fadedEdge} ${className}`}>
    <div className={`${styles.overlay} ${styles[position]}`} />
    {children}
  </div>
);

FadedEdge.propTypes = propTypes;

export default FadedEdge;

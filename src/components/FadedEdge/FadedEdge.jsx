import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FadedEdge.css';

const propTypes = {
  position: PropTypes.oneOf(['left', 'right']),

};

const FadedEdge = ({ position = 'right', children, className }) => (
  <div className={classNames('FadedEdge', className)}>
    <div className={classNames('overlay', position)} />
    {children}
  </div>
);

FadedEdge.propTypes = propTypes;

export default FadedEdge;

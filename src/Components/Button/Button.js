import React from 'react';
import './Button.css';

const Button = ({ className, value, onClick, onPress }) => {
  return (
    <button className={className} onKeyPress={onPress} onClick={onClick}>
      {value}
    </button>
  );
};
export default Button;

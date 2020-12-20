import React from 'react';
// import './Button.css';

const Button = (props) => (
  <button
    onClick={props.handleClick}
    title={props.title}
    className={props.className}
    >{props.children}
  </button>
)

export default Button;

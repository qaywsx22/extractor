import React from 'react';
// import './Button.css';

const Button = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    onClick={props.handleClick}
    title={props.title}
    className={props.className}
    >{props.children}
  </button>
))

export default Button;

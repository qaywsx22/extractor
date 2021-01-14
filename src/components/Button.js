import React from 'react';
// import './Button.css';

var Button = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    onClick={props.handleClick}
    title={props.title}
    className={props.className}
    disabled={props.disabled === true}
    >{props.children}
  </button>
))

export default Button;

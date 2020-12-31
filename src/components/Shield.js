import React from 'react';
// import './Shield.css';

var Shield = React.forwardRef((props, ref) => (
  <div className="shield inactive" ref={ref}>
    <div className="viewer-busyind"></div>
    {props.children}
  </div>
))

export default Shield;

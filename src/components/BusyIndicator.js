import React from 'react';
// import './BusyIndicator.css';

var BusyIndicator = React.forwardRef((props, ref) => (
  <div className="shield inactive" ref={ref}>
    <div className="viewer-busyind"></div>
    {props.children}
  </div>
))

export default BusyIndicator;

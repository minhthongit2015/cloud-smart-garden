import React, { memo, useState } from 'react';
import { MDBWaves } from 'mdbreact';


export default memo(({ children, className, ...restProps }) => {
  const [cursorPos, setCursorPos] = useState({});
  function clickHandler(event) {
    event.stopPropagation();
    setCursorPos({
      top: event.clientY,
      left: event.clientX,
      time: Date.now()
    });
  }
  return (
    <div {...restProps} className={`overflow-hidden position-relative ${className || ''}`} onClick={clickHandler}>
      {children}
      <MDBWaves cursorPos={cursorPos} />
    </div>
  );
});

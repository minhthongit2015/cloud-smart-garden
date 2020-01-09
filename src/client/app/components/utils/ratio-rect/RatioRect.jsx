import React from 'react';


export default React.memo(({
  children, ratio = 4 / 3, height
}) => {
  const width = height != null && height * ratio;
  const isFixed = height != null && width != null;
  const style = isFixed
    ? { width: `${width}px`, height: `${height}px` }
    : {
      width: '100%', height: 0, paddingTop: `${1 / ratio * 100}%`, position: 'relative'
    };
  const innerStyle = isFixed
    ? { width: '100%', height: '100%' }
    : {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
    };

  return (
    <div className="d-flex justify-content-center w-100">
      <div style={style}>
        <div style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
});

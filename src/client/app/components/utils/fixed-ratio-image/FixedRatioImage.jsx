import React from 'react';
import './FixedRatioImage.scss';
import './FrameStyles.scss';
import { MDBWaves } from 'mdbreact';


export default ({
  wrapperClass = '', className = '', backgroundType = 'cover', style = {},
  frame = 'none' || 'rounded' || 'slash' || 'circle', interactive = false,
  ratio = 1, icon: Icon, src, ...restProps
}) => {
  const [cursorPos, setCursorPos] = React.useState({});
  function handleClick(event) {
    event.stopPropagation();
    setCursorPos({
      top: event.clientY,
      left: event.clientX,
      time: Date.now()
    });
  }
  return (
    <div
      className={`fixed-ratio-image__wrapper m-auto ${wrapperClass || ''} frame-${frame || ''}`}
      onClick={handleClick}
    >
      {Icon ? (
        <div
          {...restProps}
          className={`fixed-ratio-image ${className || ''}`}
          style={{
            paddingTop: `${(ratio && ratio * 100) || 100}%`
          }}
        >
          <div className="fixed-ratio-image__icon-wrapper">
            <Icon style={{ maxWith: '100%', maxHeight: '100%', flex: 1 }} />
          </div>
        </div>
      ) : (
        <div
          {...restProps}
          className={`fixed-ratio-image ${className}`}
          style={{
            ...style,
            paddingTop: `${(ratio && ratio * 100) || 100}%`,
            background: `url("${src}") center center/${backgroundType || 'cover'} no-repeat`
          }}
        />
      )}
      <MDBWaves cursorPos={cursorPos} />
    </div>
  );
};

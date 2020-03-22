import React, { memo } from 'react';
import './PerchIcon.scss';


export default memo(
  ({
    src, className, alt,
    height = 25, width = 25, flip,
    left, right, bottom, top,
    ...restProps
  }) => (
    <img
      src={src}
      alt={alt}
      className={`perch-icon ${className || ''}`}
      style={{
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        left: left || '',
        right: right || '',
        bottom: bottom || '',
        top: top || '',
        transform: flip ? 'scaleX(-1)' : ''
      }}
      {...restProps}
    />
  )
);

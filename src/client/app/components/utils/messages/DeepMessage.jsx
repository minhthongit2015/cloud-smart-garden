import React from 'react';

export default (props) => {
  const {
    children, className, color, ...restProps
  } = props;
  return (
    <div
      className={`text-pre-wrap text-light text-center mb-3 px-2 ${className || ''}`}
      style={{ color: `${color} !important` }}
      {...restProps}
    >
      {children}
    </div>
  );
};

import React from 'react';
import './Messages.scss';

const type = 'warn';

export default (props) => {
  const { children, className, ...restProps } = props;
  return (
    <div className={`custom-message message-wrapper message-wrapper-${type} text-pre-wrap text-center mb-2 ${className || ''}`} {...restProps}>
      <span className={`message-${type} px-2 py-2 m-auto`}>{children}</span>
    </div>
  );
};

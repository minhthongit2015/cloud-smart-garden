import React, { memo } from 'react';


const ButtonLink = memo(({
  children, className,
  color = 'light', hover = 'light-red', ...restProps
}) => (
  <span
    className={`link my-2 text-${color} hover-${hover} ${className || ''}`}
    {...restProps}
  >
    {children}
  </span>
));

export default ButtonLink;

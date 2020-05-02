import React, { memo } from 'react';
import HistoryHelper from '../../../helpers/HistoryHelper';


export default memo(({
  to, children, className = 'text-light hover-light-red', style, ...restProps
}) => {
  function handleClick(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
    const { currentTarget: { href } } = event;
    HistoryHelper.pushRoute(href);
  }
  return (
    <a
      href={to}
      className={`link py-1 ${className || ''}`}
      style={style}
      onClick={handleClick}
      {...restProps}
    >{children}
    </a>
  );
});

import React from 'react';
import './IconBookmark.scss';

export default React.memo((props) => {
  const { className, totalSaved, ...restProps } = props;

  return (
    <svg
      viewBox="0 0 32 54"
      className={`icon-bookmark ${className || ''}`}
      {...restProps}
    >
      <title>{Math.max(totalSaved, 1)} lượt lưu</title>
      <g id="9eb32880-cd59-408f-bb6c-fb8e4b5a29fb">
        <g id="8d1842d0-f7ea-40c3-b5cf-3b83ca76691e">
          <path d="M16,0H0V53.44a.56.56,0,0,0,1,.4L16,38.78,31.05,53.84a.56.56,0,0,0,.95-.4V0Z" fill="#ffc269" />
          <rect width="32" height="11" fill="#d88d50" />
          <path d="M15.67,30.91l-4.6,2.42a.72.72,0,0,1-1-.76l.88-5.12a.73.73,0,0,0-.2-.63L7,23.2A.71.71,0,0,1,7.38,22l5.14-.75a.71.71,0,0,0,.54-.39l2.3-4.66a.71.71,0,0,1,1.28,0l2.3,4.66a.71.71,0,0,0,.54.39l5.14.75A.71.71,0,0,1,25,23.2l-3.72,3.62a.73.73,0,0,0-.2.63L22,32.57a.72.72,0,0,1-1,.76l-4.6-2.42A.7.7,0,0,0,15.67,30.91Z" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
});

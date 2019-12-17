import React from 'react';

export default React.memo(props => (
  <div
    className="fb-like"
    data-layout="standard"
    data-action="like"
    data-size="small"
    data-show-faces="true"
    data-share="true"
    {...props}
  />
), () => true);

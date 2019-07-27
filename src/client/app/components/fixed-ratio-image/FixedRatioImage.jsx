import React from 'react';


export default props => (
  <div
    style={{
      width: '100%',
      height: '0',
      paddingTop: `${(props.ratio && props.ratio * 100) || 100}%`,
      background: `url("${props.src}") center center/${props.type || 'cover'} no-repeat`
    }}
    {...props}
  />
);

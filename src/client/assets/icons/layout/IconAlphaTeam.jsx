import React from 'react';

export default React.memo((props) => {
  const { size = 32, ...restProps } = props;
  const src = '/images/Alpha-Team-Icon.png';
  return <img alt="Alpha Team" height={`${size}px`} width="auto" src={src} {...restProps} />;
});

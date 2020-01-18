import React from 'react';
import './IconCommunity.scss';

export default React.memo((props) => {
  const { text, ...restProps } = props;
  return (
    <span className="icon-wrapper">
      <i className="fas fa-users icon-community" {...restProps} />{text ? ` ${text}` : ''}
    </span>
  );
});

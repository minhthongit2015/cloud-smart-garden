import React from 'react';

export default React.memo((props) => {
  const { url, className, ...restProps } = props;
  return (
    <div
      className={`fb-share-button ${className || ''}`}
      data-href={url}
      data-layout="button_count"
      data-size="large"
      style={{ maxHeight: '29px', overflow: 'hidden' }}
      {...restProps}
    >
      chia sẻ
      {/* <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.url}
        className="fb-xfbml-parse-ignore"
      >chia sẻ
      </a> */}
    </div>
  );
});

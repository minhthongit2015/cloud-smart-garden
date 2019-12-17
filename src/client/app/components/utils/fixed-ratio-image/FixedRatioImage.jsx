import React from 'react';
import './FixedRatioImage.scss';


export default (props) => {
  const {
    wrapperClass = '', className = '', icon, ratio = 1, src, backgroundType, style = {}, ...restProps
  } = props;
  return (
    <div className={`fixed-ration-image-wrapper ${wrapperClass}`}>
      {icon ? (
        <div
          {...restProps}
          className={`fixed-ration-image ${className || ''}`}
          style={{
            width: '100%',
            height: '0',
            paddingTop: `${(ratio && ratio * 100) || 100}%`,
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <props.icon style={{ maxWith: '100%', maxHeight: '100%', flex: 1 }} />
          </div>
        </div>
      ) : (
        <div
          {...restProps}
          className={`fixed-ration-image ${className}`}
          style={{
            ...(style),
            width: '100%',
            height: '0',
            paddingTop: `${(ratio && ratio * 100) || 100}%`,
            background: `url("${src}") center center/${backgroundType || 'cover'} no-repeat`
          }}
        />
      )}
    </div>
  );
};

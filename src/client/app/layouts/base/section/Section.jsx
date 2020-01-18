import React from 'react';
import './Section.scss';

export default React.memo(({
  className, title, beautyFont, children, ...restProps
}) => (
  <section
    className={`base-section ${className || ''}`}
    {...restProps}
  >
    {title && (
      <div className={`base-section__title ${beautyFont ? 'beauty-font' : ''}`}>{title}</div>
    )}
    {children}
  </section>
));

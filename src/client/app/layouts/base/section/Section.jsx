import React from 'react';
import PropTypes from 'prop-types';
import './Section.scss';

const Section = React.memo(({
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

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  beautyFont: PropTypes.bool
};

Section.defaultProps = {
  className: '',
  title: '',
  beautyFont: false
};

export default ({
  className, title, beautyFont, ...restProps
}) => (
  <Section
    className={className}
    title={title}
    beautyFont={beautyFont}
    {...restProps}
  />
);

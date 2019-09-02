import React, { Component } from 'react';
import './SectionBody.scss';

export default class SectionBody extends Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      <div className={`base-section__body ${className || ''}`} {...restProps} />
    );
  }
}

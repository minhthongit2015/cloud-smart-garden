import React, { Component } from 'react';
import './SectionBody.scss';

export default class SectionBody extends Component {
  render() {
    const { className, ...restProps } = this.props;
    console.log('render "Layouts/base/section/SectionBody.jsx"');
    return (
      <div className={`base-section__body ${className}`} {...restProps} />
    );
  }
}

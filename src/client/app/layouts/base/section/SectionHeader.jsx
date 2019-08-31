import React, { Component } from 'react';
import './SectionHeader.scss';

export default class SectionHeader extends Component {
  render() {
    const { className, ...restProps } = this.props;
    console.log('render "Layouts/base/section/SectionHeader.jsx"');
    return (
      <div className={`base-section__header ${className}`} {...restProps} />
    );
  }
}

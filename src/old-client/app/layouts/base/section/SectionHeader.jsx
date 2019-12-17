import React, { Component } from 'react';
import './SectionHeader.scss';

export default class SectionHeader extends Component {
  render() {
    const { className, ...restProps } = this.props;
    return (
      <div className={`base-section__header ${className || ''}`} {...restProps} />
    );
  }
}

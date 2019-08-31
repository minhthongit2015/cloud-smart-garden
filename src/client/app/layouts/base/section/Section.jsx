import React, { Component } from 'react';
import './Section.scss';

export default class Section extends Component {
  render() {
    const { className, ...restProps } = this.props;
    console.log('render "Layouts/base/section/Section.jsx"');
    return (
      <section className={`base-section ${className}`} {...restProps} />
    );
  }
}

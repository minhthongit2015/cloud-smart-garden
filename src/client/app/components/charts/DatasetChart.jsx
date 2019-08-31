import React, { Component } from 'react';
import BaseChart from './BaseChart';

export default class DatasetChart extends Component {
  render() {
    const { className, ...restProps } = this.props;
    console.log('render "Components/charts/base/DatasetChart.jsx"');
    return (
      <BaseChart className={`dataset-chart ${className}`} {...restProps} />
    );
  }
}

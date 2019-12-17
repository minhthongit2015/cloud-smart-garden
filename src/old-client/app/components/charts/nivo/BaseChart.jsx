import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import './BaseChart.scss';


export default class BaseChart extends Component {
  render() {
    console.log('render "Components/charts/base/BaseChart.jsx"');
    const {
      className, wrapperProps = {}, options, data, ...restProps
    } = this.props;
    const baseOptions = {
      margin: {
        top: 20, right: 20, bottom: 60, left: 40
      },
      animate: true,
      enableSlices: 'x'
    };
    return (
      <div className="base-chart-wrapper">
        <div className={`base-chart ${className}`} {...wrapperProps}>
          <ResponsiveLine
            data={data}
            {...baseOptions}
            {...restProps}
          />
        </div>
      </div>
    );
  }
}

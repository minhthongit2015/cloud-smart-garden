import React, { Component } from 'react';
import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line';
import './BaseChart.scss';


export default class BaseChart extends Component {
  render() {
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
          <ResponsiveLineCanvas
            data={data}
            xScale={{ type: 'linear' }}
            {...baseOptions}
            {...restProps}
          />
        </div>
      </div>
    );
  }
}

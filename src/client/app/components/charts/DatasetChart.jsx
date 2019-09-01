import React, { Component } from 'react';
import BaseChart from './BaseChart';

const CustomSymbol = ({
  size, color, borderWidth, borderColor
}) => (
  <g>
    <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
    <circle r={size / 5} strokeWidth={borderWidth} stroke={borderColor} fill={color} fillOpacity={0.35} />
  </g>
);
// const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter'];


export default class DatasetChart extends Component {
  render() {
    console.log('render "Components/charts/base/DatasetChart.jsx"');
    const { className, ...restProps } = this.props;
    const datasetChartOptions = {
      yScale: {
        type: 'linear',
        stacked: true
      },
      curve: 'monotoneX',
      pointSymbol: CustomSymbol,
      pointSize: 16,
      pointBorderWidth: 1,
      pointBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]]
      },
      axisLeft: {
        tickSize: 10
      }
    };
    const chartOptions = {
      ...datasetChartOptions,
      ...restProps
    };
    return (
      <BaseChart className={`dataset-chart ${className}`} {...chartOptions} />
    );
  }
}

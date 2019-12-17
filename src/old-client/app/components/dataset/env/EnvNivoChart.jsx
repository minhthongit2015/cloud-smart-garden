import React, { Component } from 'react';
import BaseChart from '../../charts/nivo/BaseChart';

// const CustomSymbol = ({
//   size, color, borderWidth, borderColor
// }) => (
//   <g>
//     <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
//     <circle
//       r={size / 5}
//       strokeWidth={borderWidth}
//       stroke={borderColor}
//       fill={color}
//       fillOpacity={0.35}
//     />
//   </g>
// );
// const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter'];


export default class DatasetChart extends Component {
  render() {
    console.log('render "Components/charts/base/DatasetChart.jsx"');
    const { className, ...restProps } = this.props;
    const datasetChartOptions = {
      xScale: {
        type: 'time',
        format: '%H:%M',
        precision: 'minute'
      },
      xFormat: 'time:%H:%M',
      yScale: {
        type: 'linear',
        stacked: false,
        max: 100
      },
      axisBottom: {
        format: '%H:%M',
        tickValues: 'every 10 minutes',
        legend: 'time scale',
        legendOffset: -12
      },

      curve: 'monotoneX',
      enablePoints: false,
      enablePointLabel: true,
      legends: [
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]
      // pointSymbol: CustomSymbol,
      // pointSize: 16,
      // pointBorderWidth: 1,
      // pointBorderColor: {
      //   from: 'color',
      //   modifiers: [['darker', 0.3]]
      // },
      // axisLeft: {
      //   tickSize: 10
      // }
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

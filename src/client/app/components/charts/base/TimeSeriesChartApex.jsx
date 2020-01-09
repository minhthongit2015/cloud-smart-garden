/* eslint-disable class-methods-use-this */
import React from 'react';
import ApexChart from 'react-apexcharts';
import BasePureComponent from '../../BasePureComponent';
import DemoDataApexLineChart from './DemoDataApexLineChart';


/**
 * Đặc điểm của Apex Line Chart
 * - Tự động tick theo tỉ lệ phù hợp trên trục thời gian
 */
export default class TimeSeriesChart extends BasePureComponent {
  get idPrefix() {
    return 'line-chart';
  }

  get unique() {
    return this.props.id;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

    this.options = {
      chart: {
        id: this.id,
        height: 250,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 0
      },
      tooltip: {
        x: {
          format: 'dd/MM HH:mm'
        }
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }
      }
    };
  }

  render() {
    const { options, series } = this.props;
    let chartOptions = this.options;
    if (options) {
      chartOptions = { ...chartOptions, ...options };
    }
    if (!series) {
      chartOptions = { ...chartOptions, ...DemoDataApexLineChart.options };
    }

    return (
      <div id="dataset-chart" className="apex chart-wrapper shadow mt-3 mb-2 pt-3 pr-2">
        <ApexChart
          ref={this.chartRef}
          options={chartOptions}
          series={series || DemoDataApexLineChart.series}
          type="area"
          height={chartOptions.chart.height}
        />
      </div>
    );
  }
}

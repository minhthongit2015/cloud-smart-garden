import React, { Component } from 'react';
import ApexChart from 'react-apexcharts';
import './EnvApexChart.scss';
import Random from '../../utils/Random';

export default class TrainingProgressChart extends Component {
  constructor(props) {
    super(props);
    this.id = `training-progress-chart__${props.id || Random.hex()}`;

    this.state = {
      options: {
        chart: {
          id: this.id,
          height: 300
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          x: {
          }
        },
        xaxis: {
          type: 'numeric',
          tickAmount: 6
        },
        yaxis: {
          tickAmount: 4,
          max: 1,
          min: 0,
          tooltip: {
            enabled: false
          },
          labels: {
            formatter: val => val.toFixed(2)
          }
        }
      },
      series: [
        { name: 'Accuracy', data: [] }
      ]
    };

    this.chartRef = null;
  }

  componentDidMount() {
    this.setData(this.props.dataset);
  }

  setData(dataset) {
    const { columns } = this.props;
    if (this.chartRef.chart && columns && dataset) {
      this.setState((prevState) => {
        prevState.options.xaxis.categories = dataset.labels;
        if (this.chartRef.chart) {
          this.chartRef.chart.updateOptions(prevState.options);
        }
        return {
          options: prevState.options,
          series: columns
            .map(column => ({
              index: dataset.columns.indexOf(column),
              name: column
            }))
            .filter(column => column.index >= 0)
            .map(column => ({
              name: column.name,
              data: dataset.rows.map(row => row[column.index])
            }))
            .reverse()
        };
      });
    }
  }

  render() {
    const { options, series } = this.state;
    return (
      <div id="dataset-chart" className="apex chart-wrapper shadow mt-3 mb-2 pt-3 pr-2">
        <ApexChart
          ref={(ref) => { this.chartRef = ref; }}
          options={options}
          series={series}
          type="area"
        />
      </div>
    );
  }
}

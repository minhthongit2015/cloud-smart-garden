import React, { Component } from 'react';
import ApexChart from 'react-apexcharts';
// import './EnvApexChart.scss';
import Random from '../../utils/Random';

export default class TrainingProgressChart extends Component {
  constructor(props) {
    super(props);
    this.id = `training-progress-chart__${props.id || Random.hex()}`;

    this.state = {
      options: {
        chart: {
          id: this.id,
          height: 150
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
          max: 1.0,
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

  appendData(data) {
    this.chartRef.chart.appendData(data);
  }

  updateSeries(series) {
    this.chartRef.chart.updateSeries(series);
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

  updateOptions(isAccuracy) {
    this.setState((prevState) => {
      const { options } = prevState;
      if (isAccuracy) {
        Object.assign(options.yaxis, {
          tickAmount: 4,
          max: 1.0,
          min: 0
        });
      } else {
        Object.assign(
          Array.isArray(options.yaxis) ? options.yaxis[0] : options.yaxis,
          {
            tickAmount: undefined,
            max: undefined,
            min: undefined
          }
        );
      }
      if (this.chartRef.chart) {
        this.chartRef.chart.updateOptions(options);
      }
      return {
        options
      };
    });
  }

  render() {
    const { options, series } = this.state;

    return (
      <div id="dataset-chart" className="apex chart-wrapper shadow pt-3 pr-2">
        <ApexChart
          ref={(ref) => { this.chartRef = ref; }}
          options={options}
          series={series}
          height="150px"
          type="area"
        />
      </div>
    );
  }
}

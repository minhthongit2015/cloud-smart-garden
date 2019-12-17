import React, { Component } from 'react';
import ApexChart from 'react-apexcharts';
import '../../charts/EnvApexChart.scss';
import Random from '../../../utils/Random';

export default class DatasetChart extends Component {
  constructor(props) {
    super(props);
    this.id = `env-chart__${props.id || Random.hex()}`;

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
      },
      series: []
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

import React, { Component } from 'react';
import ApexChart from 'react-apexcharts';
import Random from '../../utils/Random';


export default class TrainingProgressChart extends Component {
  get chart() {
    return this.chartRef.current && this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);
    this.id = `training-progress-chart__${props.id || Random.hex()}`;

    this.series = [
      { name: 'Accuracy', data: [] }
    ];
    this.chartRef = React.createRef();
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
      series: this.series,
      epoch: 0,
      batch: 0
    };
  }

  componentDidMount() {
    this.setData(this.props.dataset);
  }

  appendData(newData) {
    const { enableLimit, limit } = this.props;
    const [{ data }] = this.series;
    if (enableLimit && data.length < +limit) {
      this.chart.appendData([{ data: [newData] }]);
    } else {
      data.push(newData);
      data.shift();
      this.updateSeries(this.series);
    }
  }

  updateSeries(series) {
    this.series = series;
    this.chart.updateSeries(series);
  }

  setEpochAndBatch({ epoch, batch }) {
    this.setState(prevState => ({
      epoch: epoch != null ? epoch + 1 : prevState.epoch,
      batch: batch != null ? batch + 1 : prevState.batch
    }));
  }

  setData(dataset) {
    const { columns } = this.props;
    if (this.chart && columns && dataset) {
      this.setState((prevState) => {
        prevState.options.xaxis.categories = dataset.labels;
        if (this.chart) {
          this.chart.updateOptions(prevState.options);
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
      const yaxis = Array.isArray(options.yaxis) ? options.yaxis[0] : options.yaxis;
      if (isAccuracy) {
        Object.assign(yaxis, {
          tickAmount: 4,
          max: 1.0,
          min: 0
        });
      } else {
        Object.assign(yaxis, {
          tickAmount: undefined,
          max: undefined,
          min: undefined
        });
      }
      if (this.chart) {
        this.chart.updateOptions(options);
      }
      return {
        options
      };
    });
  }

  render() {
    const {
      options, series, epoch, batch
    } = this.state;

    return (
      <div id="dataset-chart" className="trainging-progress apex chart-wrapper shadow pt-3 pr-2">
        <ApexChart
          ref={this.chartRef}
          options={options}
          series={series}
          height="150px"
          type="area"
        />
        <div className="trainging-progress__meta">
          Epoch: {epoch || 0} / Batch: {batch || 0}
        </div>
      </div>
    );
  }
}

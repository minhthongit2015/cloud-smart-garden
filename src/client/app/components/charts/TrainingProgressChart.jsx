import React from 'react';
import ApexChart from 'react-apexcharts';
import BaseChart from '../charts-new/base-chart/BaseChart';


export default class TrainingProgressChart extends BaseChart {
  constructor(props) {
    super(props);
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
            formatter: val => val.toFixed(3)
          }
        }
      },
      series: this.series,
      epoch: 0,
      batch: 0,
      accuracy: 0,
      loss: 0
    };
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

  setEpochAndBatch({
    epoch, batch, acc: accuracy, loss
  }) {
    this.setState(prevState => ({
      epoch: epoch != null ? epoch + 1 : prevState.epoch,
      batch: batch != null ? batch + 1 : prevState.batch,
      accuracy: accuracy != null ? accuracy : prevState.accuracy,
      loss: loss != null ? loss : prevState.loss
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

  renderChart() {
    const { options, series } = this.state;
    return (
      <ApexChart
        ref={this.chartRef}
        id={this.id}
        options={options}
        series={series}
        height="150px"
        type="area"
      />
    );
  }

  renderCustomArea() {
    const {
      epoch, batch, accuracy, loss
    } = this.state;
    return (
      <div className="trainging-progress__meta">
        <div>Epoch: {epoch || 0} / Batch: {batch || 0}</div>
        <div>
          {accuracy ? `Accuracy: ${accuracy.toFixed(3)}` : ''}
          {accuracy && loss ? ' / ' : ''}
          {loss ? `Loss: ${loss.toFixed(3)}` : ''}
        </div>
      </div>
    );
  }
}

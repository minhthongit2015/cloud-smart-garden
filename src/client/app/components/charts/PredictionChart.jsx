import React from 'react';
import ApexChart from 'react-apexcharts';
import BaseChart from '../charts-new/base-chart/BaseChart';


export default class extends BaseChart {
  get total() {
    return this.series && this.series[0] && this.series[0].data.length;
  }

  constructor(props) {
    super(props);

    this.series = [
      { name: 'Prediction', data: [] }
    ];
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
          tooltip: {
            enabled: false
          },
          labels: {
            formatter: val => val.toFixed(2)
          }
        }
      },
      series: this.series,
      miss: 0
    };
  }

  setData(trainingSet) {
    this.updateOptions();
    const labels = trainingSet.ys.map(y => y[0]);
    const predictions = trainingSet.predict;
    this.updateSeries([
      { name: 'Giá trị đúng', data: labels },
      { name: 'Dự đoán', data: predictions }
    ]);

    let miss = 0;
    labels.forEach((y, i) => {
      if (y !== predictions[i]) {
        miss++;
      }
    });
    this.setState({
      miss
    });
  }

  updateSeries(series) {
    this.series = series;
    this.chart.updateSeries(series);
  }

  updateOptions(isClassification) {
    this.setState((prevState) => {
      const { options } = prevState;
      const yaxis = Array.isArray(options.yaxis) ? options.yaxis[0] : options.yaxis;
      if (isClassification) {
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
        options={options}
        series={series}
        height="150px"
        type="area"
      />
    );
  }

  renderCustomArea() {
    const { miss = 0 } = this.state;
    const { total } = this;
    const match = total - miss;
    return (
      total && (
        <React.Fragment>
          <div>Đúng: {match || 0} / {miss || 0} Sai</div>
          <div>Độ chính xác: {(match / total).toFixed(2)}%</div>
        </React.Fragment>
      )
    );
  }
}

import React, { Component } from 'react';
import Chart from 'chart.js';

export default class DatasetChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.chartCtx = null;
    this.chart = null;
  }

  componentDidMount() {
    this.initialChart();
  }

  initialChart() {
    const { data } = this.props;
    if (this.canvasRef.current) {
      this.chartCtx = this.canvasRef.current.getContext('2d');
    }
    if (this.chartCtx && !this.chart) {
      this.chart = new Chart(this.chartCtx, {
        type: 'line',
        options: {
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 25,
                suggestedMax: 35
              }
            }]
          }
        }
      });
    }
    if (this.chart && data) {
      this.setData(data);
      this.update();
    }
  }

  setData(dataset) {
    const { columns } = this.props;
    if (this.chart && dataset) {
      this.chart.data = {
        labels: dataset.labels,
        datasets: columns
          .map(column => ({
            index: dataset.columns.indexOf(column),
            name: column
          }))
          .filter(column => column.index >= 0)
          .map(column => ({
            label: column.name,
            data: dataset.rows.map(row => row[column.index])
          }))
      };
    }
  }

  update() {
    this.chart.update();
  }

  pushData(dataRows) { // { temp: a, humi: b, light: c, time: d }
    dataRows.forEach((row) => {
      this.addRow();
    });
    this.chart.data.labels.push();
  }

  addRow(label, data) {
    this.chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeRow(chart) {
    this.chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  render() {
    this.initialChart();
    return (
      <div className="chart-wrapper">
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

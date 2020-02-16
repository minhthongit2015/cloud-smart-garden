import React from 'react';
import ApexChart from 'react-apexcharts';
import BaseComponent from '../../_base/BaseComponent';


export default class EditableLineChart extends BaseComponent {
  get selectedPoints() {
    return this.chartRef.current && this.chartRef.current.chart.w.globals.selectedDataPoints;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.bind(this.handlePointSelection, this.handleSelection, this.handleClick);
    this.state = {
      series: [],
      options: {
        // title: {
        //   text: props.id,
        //   floating: true,
        //   offsetY: 140,
        //   align: 'center',
        //   style: {
        //     color: '#444'
        //   }
        // },
        chart: {
          id: this.id,
          height: 100,
          events: {
            // dataPointSelection: this.handlePointSelection,
            // selection: this.handleSelection
            // click: this.handleClick
          },
          selection: {
            enabled: true,
            type: 'x',
            fill: {
              color: '#24292e',
              opacity: 0.1
            },
            stroke: {
              width: 1,
              dashArray: 3,
              color: '#24292e',
              opacity: 0.4
            }
          }
        },
        theme: {
          mode: 'dark',
          palette: 'palette5'
        },
        states: {
          active: {
            allowMultipleDataPointsSelection: true,
            filter: {
              type: 'lighten',
              value: 0.9
            }
          }
        },
        markers: {
          size: 2,
          strokeWidth: 1
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'stepline',
          width: 0
        },
        tooltip: {
          // intersect: true,
          // shared: false,
          custom: () => null,
          x: {
            format: 'dd/MM HH:mm',
            show: false
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
        },
        yaxis: {
          tickAmount: 1,
          max: 1,
          min: 0,
          tooltip: {
            enabled: false
          }
        }
      }
    };
  }

  componentDidMount() {
    this.setData(this.props.dataset);
  }

  setData(dataset) {
    const { columns } = this.props;
    if (this.chartRef.current.chart && columns && dataset) {
      this.setState((prevState) => {
        prevState.options.xaxis.categories = dataset.labels;
        this.updateOptions(prevState.options);
        return {
          dataset,
          options: prevState.options,
          series: columns
            .map(column => ({
              index: dataset.columns.indexOf(column),
              name: column
            }))
            .filter(column => column.index >= 0)
            .map(column => ({
              name: column.name,
              data: dataset.rows.map(row => (row[column.index] ? 1 : 0))
            }))
            .reverse()
        };
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  mappingData() {
    return {
      series: [],
      options: []
    };
  }

  updateOptions(options) {
    if (this.chartRef.current.chart) {
      this.chartRef.current.chart.updateOptions(options);
    }
  }

  setSelectionToOn() {
    this.toggleSelection(true);
  }

  setSelectionToOff() {
    this.toggleSelection(false);
  }

  toggleSelection(state) {
    const selectedPoints = this.selectedPoints[0];
    if (!selectedPoints) return;
    const { columns } = this.props;
    const { dataset } = this.state;
    const columnIndex = dataset.columns.indexOf(columns[0]);
    const currentSerie = this.chartRef.current.chart.w.config.series[0];
    selectedPoints.forEach((pointIndex) => {
      dataset.rows[pointIndex][columnIndex] = state;
      currentSerie.data[pointIndex] = +state;
    });
    this.chartRef.current.chart.updateSeries([currentSerie]);
  }

  handleSelection(chart, { xaxis }) {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      const { dataset } = this.state;
      const { columns } = this.props;
      if (!dataset || !columns) return;
      const startIndex = dataset.labels.findIndex(label => label >= xaxis.min);
      const endIndex = dataset.labels.findIndex(label => label > xaxis.max) - 1;
      if (startIndex < 0 || endIndex < 0) return;
      const selectedDataPoints = chart.w.globals.selectedDataPoints[0];
      this.clearOldSelectedDataPoints(selectedDataPoints, startIndex, endIndex);
      this.selectDataPoints(selectedDataPoints, startIndex, endIndex);
    }, 500);
  }

  clearOldSelectedDataPoints(selectedDataPoints, startIndex, endIndex) {
    if (!selectedDataPoints) return;
    let done = true;
    selectedDataPoints.forEach((pointIndex) => {
      if (pointIndex < startIndex || pointIndex > endIndex) {
        done = false;
        this.toggleDataPointSelection(0, pointIndex);
      }
    });
    if (!done) {
      setTimeout(() => {
        this.clearOldSelectedDataPoints(selectedDataPoints, startIndex, endIndex);
      }, 200);
    }
  }

  selectDataPoints(selectedDataPoints, startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      if (!selectedDataPoints || !selectedDataPoints.includes(i)) {
        this.toggleDataPointSelection(0, i);
      }
    }
  }

  toggleDataPointSelection(seriesIndex, pointIndex) {
    this.chartRef.current.chart.toggleDataPointSelection(seriesIndex, pointIndex);
  }

  // eslint-disable-next-line class-methods-use-this
  handlePointSelection(event, chartContext, selectedDataPoints) {
    if (event) {
      console.log(event, chartContext, selectedDataPoints);
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick(/* event, chartContext, config */) {
    // console.log(event, chartContext, config);
    return false;
  }

  render() {
    const { options, series } = this.state;
    return (
      <div id={this.id} className="apex chart-wrapper shadow mt-3 mb-2 pt-3 px-2">
        <ApexChart
          ref={this.chartRef}
          options={options}
          series={series}
          type="area"
          height={options.chart.height}
        />
        {this.props.children}
      </div>
    );
  }
}

import ChartHelper from './ChartHelper';


export default class extends ChartHelper {
  static buildProps(records) {
    return {
      series: this.recordsToLine(records)
    };
  }

  static recordsToLine(records, keys = ['temperature', 'humidity', 'light']) {
    return keys.map(key => this.splitToLine(records, key));
  }

  static splitToLine(records, key) {
    return {
      name: key,
      data: records.map(record => ({
        x: record.createdAt,
        y: record.state[key]
      }))
    };
  }

  static buildDataFromDataset(dataset) {
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
}

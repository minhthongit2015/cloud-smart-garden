import ChartAdapter from './ChartAdapter';


export default class extends ChartAdapter {
  static buildProps(records) {
    return {
      series: this.recordsToLine(records)
    };
  }

  static recordsToLine(records, keys = ['temperature', 'humidity', 'light', 'nutri']) {
    return keys.map(key => this.splitToLine(records, key));
  }

  /**
   *
   * @param {[
   *  {
   *    createdAt: 1234,
   *    state: {
   *      temperature: 123,
   *      humidity: 123,
   *      light: 123
   *    }
   *  }
   * ]} records
   * @param {'temperature' | 'humidity' | 'light' | 'nutri'} key
   */
  static splitToLine(records, key) {
    return {
      name: key,
      data: records.map(record => ({
        x: record.createdAt,
        y: record.state[key]
      }))
    };
  }

  /**
   *
   * @param {*} dataset
   * @deprecated todo: migrate
   */
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

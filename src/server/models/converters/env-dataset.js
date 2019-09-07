
const lodash = require('lodash');
const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(rawData, options) {
    if (options && options.features) {
      const { features } = options;
      const featureEntries = Object.entries(features);
      const labels = featureEntries.map(featureEntry => featureEntry[1]);
      const rows = rawData.map(
        row => featureEntries.map(([featurePath]) => lodash.get(row, featurePath))
      );
      return {
        labels,
        rows
      };
    }

    const columns = [];
    const labels = [];
    const rows = rawData.map((row) => {
      Object.keys(row.state).forEach((col) => {
        if (!columns.includes(col)) {
          columns.push(col);
        }
      });
      labels.push(row.createdAt ? row.createdAt.getTime() : 0);
      return columns.map(col => row.state[col] || 0);
    });
    const firstRow = rawData[0];
    const gardenId = firstRow && firstRow.gardenId;
    const stationId = firstRow && firstRow.stationId;

    return {
      meta: {
        gardenId,
        stationId
      },
      columns,
      rows,
      labels
    };
  }
};

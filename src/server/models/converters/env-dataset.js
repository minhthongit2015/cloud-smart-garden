
const lodash = require('lodash');
const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(rawData, options) {
    if (options && options.features && options.labels) {
      const { features, labels } = options;

      const featureEntries = Object.entries(features);
      const inputColumns = featureEntries.map(featureEntry => featureEntry[1]);
      const xs = rawData.map(
        row => featureEntries.map(([featurePath]) => lodash.get(row, featurePath))
      );

      const labelsEntries = Object.entries(labels);
      const outputColumns = labelsEntries.map(labelEntry => labelEntry[1]);
      const ys = rawData.map(
        row => labelsEntries.map(([labelPath]) => +lodash.get(row, labelPath))
      );

      return {
        xs,
        ys,
        inputColumns,
        outputColumns
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

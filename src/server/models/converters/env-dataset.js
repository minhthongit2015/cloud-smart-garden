
const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(rawData) {
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

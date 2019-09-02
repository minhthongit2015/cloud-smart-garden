
module.exports = class Serializer {
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
    return {
      meta: {
        gardenId: rawData.gardenId,
        stationId: rawData.stationId
      },
      columns,
      rows,
      labels
    };
  }

  static convertCollection(collection) {
    return collection.map(object => this.convert(object));
  }
};

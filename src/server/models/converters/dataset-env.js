
const Converter = require('./converter');

/**
 * Convert array to object base on an properties map
 * @param { Array } array [ 1, 2, 3, ... ]
 * @param { Array } propsMap [ 'prop1', 'prop2', 'prop3', ... ]
 * @returns { Object } { prop1: 1, prop2: 2, prop3: 3, ... }
 */
function arrayToObject(array, propsMap) {
  const object = {};
  propsMap.forEach((prop, propIndex) => {
    object[prop] = array[propIndex];
  });
  return object;
}

module.exports = class extends Converter {
  static convert(dataset) {
    const {
      meta: { gardenId, stationId }, columns, labels, rows
    } = dataset;
    const rawData = rows.map((row, rowIndex) => ({
      gardenId,
      stationId,
      createdAt: labels[rowIndex],
      state: arrayToObject(row, columns)
    }));

    return rawData;
  }
};

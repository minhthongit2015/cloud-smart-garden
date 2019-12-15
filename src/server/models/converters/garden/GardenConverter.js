
const Converter = require('../converter');

module.exports = class extends Converter {
  static convert(object) {
    const data = super.convert(object);
    return data;
  }
};

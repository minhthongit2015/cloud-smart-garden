
const Converter = require('./converter');

module.exports = class extends Converter {
  static serialze(object) {
    const garden = JSON.parse(JSON.stringify(object));
    return garden;
  }
};

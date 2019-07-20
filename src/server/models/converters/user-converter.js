const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(object) {
    const rawUser = JSON.parse(JSON.stringify(object));
    return rawUser;
  }
};

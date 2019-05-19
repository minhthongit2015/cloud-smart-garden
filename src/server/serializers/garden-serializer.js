  
const Serializer = require('./serializer');

module.exports = class extends Serializer {
  static serialze(object) {
    const garden = JSON.parse(JSON.stringify(object));
    return garden;
  }
};

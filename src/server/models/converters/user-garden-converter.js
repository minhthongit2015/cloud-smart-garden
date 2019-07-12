
const Serializer = require('./converter');

module.exports = class extends Serializer {
  static convert(object) {
    const userGarden = JSON.parse(JSON.stringify(object));
    return userGarden.garden;
  }
};

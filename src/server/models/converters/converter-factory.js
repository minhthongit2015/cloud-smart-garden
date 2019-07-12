
const Converter = require('./converter');
const GardenConverter = require('./garden-converter');
const UserGardenConverter = require('./user-garden-converter');

module.exports = class {
  static get(name) {
    switch (name) {
    case 'garden':
      return GardenConverter;
    case 'user-garden':
      return UserGardenConverter;
    default:
      return Converter;
    }
  }
};

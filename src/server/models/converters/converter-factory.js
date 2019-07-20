
const Converter = require('./converter');
const GardenConverter = require('./garden-converter');
const UserGardenConverter = require('./user-garden-converter');
const UserConverter = require('./user-converter');

module.exports = class {
  static get(name) {
    switch (name) {
    case 'garden':
      return GardenConverter;
    case 'user-garden':
      return UserGardenConverter;
    case 'user':
      return UserConverter;
    default:
      return Converter;
    }
  }
};


const Serializer = require('./converter');
const GardenSerializer = require('./garden-serializer');
const UserGardenSerializer = require('./user-garden-converter');

module.exports = class {
  static get(name) {
    switch (name) {
    case 'garden':
      return GardenSerializer;
    case 'user-garden':
      return UserGardenSerializer;
    default:
      return Serializer;
    }
  }
};

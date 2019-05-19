
const Serializer = require('./serializer');
const GardenSerializer = require('./garden-serializer');
const UserGardenSerializer = require('./user-garden-serializer');

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

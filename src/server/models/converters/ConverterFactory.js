
const Converter = require('./converter');
const UserConverter = require('./user/UserConverter');
const RatingConverter = require('./blog/RatingConverter');
const PlaceConverter = require('./map/PlaceConverter');
const GardenConverter = require('./garden/GardenConverter');
const UserGardenConverter = require('./garden/UserGardenConverter');
const Env2DatasetConverter = require('./garden/Env2Dataset');
const Dataset2EnvConverter = require('./garden/Dataset2Env');

const ConverterMap = {
  User: UserConverter,
  Rating: RatingConverter,
  Place: PlaceConverter,
  Garden: GardenConverter,
  UserGarden: UserGardenConverter,
  Env2Dataset: Env2DatasetConverter,
  Dataset2Env: Dataset2EnvConverter
};

module.exports = class {
  static get(name) {
    return ConverterMap[name] || Converter;
  }
};

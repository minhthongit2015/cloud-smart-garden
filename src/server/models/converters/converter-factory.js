
const Converter = require('./converter');
const GardenConverter = require('./garden-converter');
const UserGardenConverter = require('./user-garden-converter');
const EnvDatasetConverter = require('./env-dataset');
const DatasetEnvConverter = require('./dataset-env');

module.exports = class {
  static get(name) {
    switch (name) {
    case 'garden':
      return GardenConverter;
    case 'user-garden':
      return UserGardenConverter;
    case 'env-dataset':
      return EnvDatasetConverter;
    case 'dataset-env':
      return DatasetEnvConverter;
    default:
      return Converter;
    }
  }
};

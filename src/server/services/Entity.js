
const { Entity } = require('../models/mongo');
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/converter-factory');


module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    const entities = await ApiHelper.findWithModel(Entity, opts);
    return ConverterFactory.get('entity').convertCollection(entities);
  }
};

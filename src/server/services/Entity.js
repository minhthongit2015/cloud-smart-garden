
const { Entity } = require('../models/mongo');
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/converter-factory');


module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    opts = ApiHelper.parseListParams(opts);

    const entities = await Entity.find({})
      .sort(opts.sort)
      .skip(opts.offset)
      .limit(opts.limit)
      .exec();

    return ConverterFactory.get('entity').convertCollection(entities);
  }
};

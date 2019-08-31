
const { Entity } = require('../models/mongo');
const ConverterFactory = require('../models/converters/converter-factory');


module.exports = class {
  static async list(opts = {
    limit: 0, offset: 0, sort: [], fields: undefined
  }) {
    if (typeof opts.sort === 'string') {
      opts.sort = JSON.parse(opts.sort);
    }

    Object.assign({
      limit: 0, offset: 0, sortBy: [], fields: undefined
    }, opts);

    const entities = await Entity.find({})
      // .sort(opts.sort)
      // .skip(opts.offset)
      // .limit(opts.limit)
      .exec();

    return ConverterFactory.get('entity').convertCollection(entities);
  }
};


const { Entity } = require('../models/mongo');


module.exports = class {
  static async list(opts = {
    limit: 0, offset: 0, sort: [], fields: {}
  }) {
    Object.assign({
      limit: 0, offset: 0, sortBy: [], fields: {}
    }, opts);

    return Entity.find({})
      .sort(opts.sort)
      .skip(opts.offset)
      .limit(opts.limit);
  }
};

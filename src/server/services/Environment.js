const moment = require('moment');
const { Environment } = require('../models/mongo');
const ApiHelper = require('../utils/ApiHelper');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    return ApiHelper.findWithModel(Environment, opts);
  }

  static async create(object) {
    const lastRecord = await ApiHelper.findWithModel(Environment, {
      limit: 1
    });
    if (lastRecord && lastRecord[0] && moment(moment.now()).diff(lastRecord[0].createdAt, 'minute') < 10) {
      return null;
    }
    return Environment.create(object);
  }

  static update(where, doc) {
    return Environment.updateOne(where, doc).exec();
  }

  static delete() {

  }
};

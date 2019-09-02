const { Environment } = require('../../models/mongo');
const ApiHelper = require('../../utils/ApiHelper');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    return ApiHelper.findWithModel(Environment, opts);
  }

  static async create(object) {
    return Environment.create(object);
  }

  static update() {

  }

  static delete() {

  }
};

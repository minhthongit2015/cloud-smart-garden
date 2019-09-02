const EntityService = require('../../services/Entity');
const ApiHelper = require('../../utils/ApiHelper');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    return EntityService.list(opts);
  }
};

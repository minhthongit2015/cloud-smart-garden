const EntityService = require('../../services/Entity');
const ApiHelper = require('../../utils/apiHelper');

module.exports = class {
  static async list(opts = { limit: 0, offset: 0, sort: [] }) {
    return EntityService.list(opts);
  }
};

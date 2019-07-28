const EntityService = require('../../services/Entity');

module.exports = class {
  static async list(opts = { limit: 0, offset: 0, sort: [] }) {
    return EntityService.list(opts);
  }
};

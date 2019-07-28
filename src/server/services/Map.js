const { Garden } = require('../models');

module.exports = class {
  static async list() {
    return Garden.findAll({});
  }
};

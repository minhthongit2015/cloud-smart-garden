const { Garden } = require('../models/sequelize');

module.exports = class {
  static async list() {
    return Garden.findAll({});
  }
};

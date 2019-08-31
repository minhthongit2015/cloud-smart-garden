const { Environment } = require('../../models/mongo');

module.exports = class {
  static async list({
    offset = 0,
    limit = null,
    condictions = {}
  }) {
    return Environment.find(
      condictions, null,
      { offset, limit }
    ).exec();
  }

  static async create(object) {
    return Environment.create(object);
  }

  static update() {

  }

  static delete() {

  }
};

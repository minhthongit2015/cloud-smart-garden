
const { Category } = require('../../models/mongo');
const CRUDService = require('../CRUDService');

module.exports = class extends CRUDService {
  static getModel() {
    return Category;
  }

  static get populate() {
    return ['children'];
  }

  static async listByTypes(types) {
    return this.list({
      opts: {
        where: {
          type: {
            $in: types
          }
        }
      }
    });
  }
};

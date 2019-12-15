
const { Category } = require('../../models/mongo');
const CRUDService = require('../CRUDService');

module.exports = class extends CRUDService {
  static getModel() {
    return Category;
  }

  static get populate() {
    return ['children'];
  }
};

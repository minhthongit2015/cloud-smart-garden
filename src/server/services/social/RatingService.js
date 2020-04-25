
const { Rating } = require('../../models/mongo');
const CRUDService = require('../CRUDService');


module.exports = class extends CRUDService {
  static getModel() {
    return Rating;
  }

  static get populate() {
    return [];
  }
};

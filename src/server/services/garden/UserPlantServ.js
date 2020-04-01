// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { UserPlant } = require('../../models/mongo');
const CRUDService = require('../CRUDService');


module.exports = class extends CRUDService {
  static getModel() {
    return UserPlant;
  }

  static get populate() {
    return ['plant'];
  }

  static async getByGarden(user) {
    return this.list({
      where: {
        owner: this.getId(user)
      }
    });
  }
};

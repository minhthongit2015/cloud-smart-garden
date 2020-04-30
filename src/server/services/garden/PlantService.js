// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Plant } = require('../../models/mongo');
const SocialService = require('../social/SocialService');


module.exports = class extends SocialService {
  static getModel() {
    return Plant;
  }

  static get populate() {
    return ['model'];
  }

  static async getByGarden(user) {
    return this.list({
      opts: {
        where: {
          owner: this.getId(user)
        }
      }
    });
  }
};

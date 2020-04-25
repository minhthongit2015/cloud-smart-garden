// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { UserPlant } = require('../../models/mongo');
const SocialService = require('../social/SocialService');


module.exports = class extends SocialService {
  static getModel() {
    return UserPlant;
  }

  static get populate() {
    return ['plant'];
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

// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Garden } = require('../../models/mongo');
const SocialService = require('../social/SocialService');
const { ModelName } = require('../../utils/Constants');


module.exports = class extends SocialService {
  static getModel() {
    return Garden;
  }

  static get populate() {
    return [
      {
        path: 'stations',
        populate: {
          path: 'plants',
          model: ModelName.userPlant,
          populate: {
            path: 'plant',
            model: ModelName.plant
          }
        }
      }
    ];
  }

  static async getMyGardens(user) {
    return this.list({
      opts: {
        where: {
          owners: {
            $elemMatch: {
              $eq: this.getId(user)
            }
          }
        }
      }
    });
  }
};

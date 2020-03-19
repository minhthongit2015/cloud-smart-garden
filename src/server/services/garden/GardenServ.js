// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Garden } = require('../../models/mongo');
const PostService = require('../blog/PostServ');

module.exports = class extends PostService {
  static getModel() {
    return Garden;
  }

  static async getMyGardens(user) {
    return this.list({
      where: {
        owner: this.getId(user)
      }
    });
  }
};

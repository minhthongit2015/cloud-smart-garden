// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Plant } = require('../../models/mongo');
const PostService = require('../blog/PostServ');

module.exports = class extends PostService {
  static getModel() {
    return Plant;
  }

  static get populate() {
    return [''];
  }

  static async getByGarden(user) {
    return this.list({
      where: {
        owner: this.getId(user)
      }
    });
  }
};

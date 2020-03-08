// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Station } = require('../../models/mongo');
const PostService = require('../blog/PostServ');

module.exports = class extends PostService {
  static getModel() {
    return Station;
  }

  static get populate() {
    return ['models', 'crops'];
  }
};

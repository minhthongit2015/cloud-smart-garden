const SocialService = require('../social/SocialService');
const { Experiment } = require('../../models/mongo');


module.exports = class extends SocialService {
  static getModel() {
    return Experiment;
  }
};

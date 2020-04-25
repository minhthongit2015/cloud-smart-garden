const { OneHundredQuotes } = require('../../models/mongo');
const SocialService = require('../social/SocialService');


module.exports = class extends SocialService {
  static getModel() {
    return OneHundredQuotes;
  }
};

const { Post } = require('../../models/mongo');
const SocialService = require('../social/SocialService');


module.exports = class extends SocialService {
  static getModel() {
    return Post;
  }

  static get populate() {
    return ['categories'];
  }
};

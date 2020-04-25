
const { Place } = require('../../models/mongo');
const SocialService = require('../social/SocialService');
const ApiHelper = require('../../utils/ApiHelper');
const { ListParams } = require('../../utils/types');


module.exports = class extends SocialService {
  static get defaultModel() {
    return Place;
  }

  static get populate() {
    return ['author', 'user', 'post', 'members', 'leaders'];
  }

  static resolveListOptions({ opts = new ListParams() }) {
    ApiHelper.SortBuilder.add(opts, '-createdAt');
    return opts;
  }
};

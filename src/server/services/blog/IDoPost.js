
const { IDoPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const PostService = require('./Post');
const UserService = require('../user/User');

module.exports = class extends CRUDService {
  static getModel() {
    return IDoPost;
  }

  static get populate() {
    return [];
  }

  static async getOrListMin(id, opts = ApiHelper.listParams, user) {
    opts = Object.assign(opts || {}, {
      where: {
        user: user._id
      }
    });
    const iDoPosts = await this.getOrList(id, opts);
    const posts = await PostService.listIn(iDoPosts, iDoPost => iDoPost.post);
    return posts;
  }

  static async addIDoPost(post, user) {
    const iDoPost = {
      user: user._id,
      post: post._id
    };
    const addResult = await this.createOrUpdate(iDoPost, iDoPost);
    if (addResult.upserted) {
      await UserService.updateSocialPoint(user, 2);
    }
    return addResult;
  }

  static async removeIDoPost(postId, user) {
    const removeSignal = {
      user: user._id,
      post: postId
    };
    const removeResult = await this.findOneAndDelete(removeSignal);
    if (removeResult) {
      await UserService.updateSocialPoint(user, -2);
    }
    return removeResult;
  }

  static async appendIWillDoThisOfUser(posts, user) {
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const iDoPosts = await this.listIn(posts, post => post._id, 'post', { user: user._id });
    iDoPosts.forEach((iDoPost) => {
      posts.find(post => post._id === iDoPost.post).iWillDoThis = true;
    });
    return iDoPosts;
  }
};

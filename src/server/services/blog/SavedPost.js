
const { SavedPost } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const PostService = require('./Post');

module.exports = class extends CRUDService {
  static getModel() {
    return SavedPost;
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
    const savedPosts = await this.getOrList(id, opts);
    const posts = await PostService.listIn(savedPosts, savedPost => savedPost.post);
    return posts;
  }

  static async addSavedPost(post, user) {
    const savedPost = {
      user: user._id,
      post: post._id
    };
    return this.createOrUpdate(savedPost, savedPost);
  }

  static async removeSavedPost(postId, user) {
    const removeSignal = {
      user: user._id,
      post: postId
    };
    return this.findOneAndDelete(removeSignal);
  }

  static async appendIsSavedOfUser(posts, user) {
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const savedPosts = await this.listIn(posts, post => post._id, 'post', { user: user._id });
    savedPosts.forEach((savedPost) => {
      posts.find(post => post._id === savedPost.post).isSaved = true;
    });
    return savedPosts;
  }
};

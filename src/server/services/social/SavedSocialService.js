
const { SavedSocial } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const PostService = require('./SocialService');
const { ListParams } = require('../../utils/types');


module.exports = class extends CRUDService {
  static getModel() {
    return SavedSocial;
  }

  static get populate() {
    return [];
  }

  static async getOrListMin(id, opts = new ListParams(), user) {
    opts = Object.assign(opts || {}, {
      where: {
        user: user._id
      }
    });
    const savedPosts = await this.getOrList(id, opts);
    const posts = await PostService.listIn({
      ids: savedPosts,
      mapFn: savedPost => savedPost.post
    });
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

  static async appendIsSavedOfUser({ posts, user, model }) {
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const savedPosts = await this.listIn({
      ids: posts,
      mapFn: post => post._id,
      idKey: 'social',
      where: { user: user._id },
      model
    });
    savedPosts.forEach((savedPost) => {
      posts.find(post => post._id === savedPost.post).isSaved = true;
    });
    return savedPosts;
  }
};

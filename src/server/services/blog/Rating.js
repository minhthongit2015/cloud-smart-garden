
const { Rating } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const PostService = require('./Post');
const UserService = require('../user/User');

module.exports = class extends CRUDService {
  static getModel() {
    return Rating;
  }

  static get populate() {
    return [];
  }

  static async rating(post, user, rating) {
    const oldRating = await this.first({
      where: {
        post: post._id,
        user: user._id
      }
    });

    if (!oldRating) {
      const newRating = await this.create({
        user: user._id,
        post: post._id,
        rating
      });

      // After create new Rating, it will auto increase post.totalRating & post.totalVotes

      await UserService.updateSocialPoint(user, 1);
      return newRating;
    }

    PostService.update(post._id, {
      totalRating: post.totalRating - oldRating.rating + rating
    });
    oldRating.rating = rating;
    await this.update({
      _id: oldRating._id,
      rating
    });

    return oldRating;
  }

  static async appendRatingOfUser(posts, user) {
    if (!posts) return null;
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const ratings = await this.listIn(posts, post => post._id, 'post', { user: user._id });
    ratings.forEach((ratingPost) => {
      posts.find(post => post._id === ratingPost.post).rating = ratingPost.rating;
    });
    return ratings;
  }
};

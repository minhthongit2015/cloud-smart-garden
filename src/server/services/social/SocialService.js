const BaseSocialService = require('./BaseSocialService');
const CategoryService = require('./CategoryService');
const RatingService = require('./RatingService');
const UserService = require('../user/User');


module.exports = class extends BaseSocialService {
  static async rating({
    post, rating, user, model
  }) {
    const oldRating = await RatingService.first({
      where: {
        post: this.getId(post),
        user: this.getId(user)
      }
    });

    if (!oldRating) {
      const newRating = await RatingService.create({
        post: this.getId(post),
        user: this.getId(user),
        rating
      });

      // After create new Rating, it will auto increase post.totalRating & post.totalVotes

      await UserService.updateSocialPoint(user, 1);
      return newRating;
    }

    this.update({
      model,
      doc: {
        id: post._id,
        doc: {
          totalRating: post.totalRating - oldRating.rating + rating
        }
      }
    });
    oldRating.rating = rating;
    await RatingService.update({
      doc: {
        _id: oldRating._id,
        rating
      }
    });

    return oldRating;
  }

  static async appendRatingOfUser({ posts, user, model }) {
    if (!posts) return null;
    if (posts.length == null) {
      posts = [posts];
    }
    if (!posts.length) {
      return null;
    }
    const ratings = await RatingService.listIn({
      ids: posts,
      mapFn: post => post._id,
      idKey: 'social',
      where: { user: user._id },
      model
    });
    ratings.forEach((ratingPost) => {
      posts.find(post => post._id === ratingPost.post).rating = ratingPost.rating;
    });
    return ratings;
  }

  static async checkNews({ user, model }) {
    if (!user.latestReads) {
      user.latestReads = {};
    }
    const categories = await CategoryService.list();
    const news = {};
    await Promise.all(categories.map(
      category => this.getModel({ model }).exists({
        categories: {
          $elemMatch: {
            $eq: category._id
          }
        },
        createdAt: {
          $gt: user.latestReads[category.type] || 0
        }
      }).then((isExisted) => {
        news[category.type] = {
          hasNews: isExisted,
          latestRead: user.latestReads[category.type] || 0
        };
      })
    ));
    return news;
  }

  static async markAsRead({ readCategories, user }) {
    readCategories.forEach(({ category, latestRead }) => {
      user.dirty = user.dirty || user.latestReads[category] !== new Date(latestRead).getTime();
      user.latestReads[category] = new Date(latestRead).getTime();
    });
  }

  static async checkUnreadPosts({ user, model }) {
    if (!user.latestReads) {
      user.latestReads = {};
    }
    const categories = await CategoryService.list();
    const conditions = categories.map(category => ({
      categories: {
        $elemMatch: {
          $eq: category._id
        }
      },
      createdAt: {
        $gte: user.latestReads[category.type] || 0
      }
    }));

    const unreadPosts = await this.list({
      model,
      opts: {
        where: {
          $or: conditions
        }
      }
    });

    return unreadPosts;
  }

  static async seenLatestPost({ user, post }) {
    post.categories.forEach((category) => {
      const latestPostTimestamp = user.latestReads[category.type] || 0;
      const postTimestamp = new Date(post.createdAt).getTime();
      if (postTimestamp > latestPostTimestamp) {
        user.latestReads[category.name] = postTimestamp;
        user.dirty = true;
      }
    });
  }
};

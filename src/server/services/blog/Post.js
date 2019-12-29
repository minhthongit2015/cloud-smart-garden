
const xss = require('xss');
const {
  Post,
  BlogPost,
  Garden, Station,
  Project, Experiment, Dataset, TrainedModel, Team, Folder
} = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./Category');
const UserService = require('../user/User');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../third-party/imgur');
const { PostStatus } = require('../../utils/Constants');

const PostTypes = [
  Post,
  BlogPost,
  Garden, Station,
  Project, Experiment, Dataset, TrainedModel, Team, Folder
];

module.exports = class extends CRUDService {
  static getModel(post) {
    if (!post || !post.__t) {
      return Post;
    }
    return PostTypes.find(type => type.modelName === post.__t) || Post;
  }

  static get populate() {
    return ['categories'];
  }

  static async resolveListOptions(opts = ApiHelper.listParams) {
    opts.where = Object.assign(opts.where || {}, {
      status: PostStatus.published
    });
    if (opts.categories) {
      opts.categories = JSON.parse(opts.categories);
      const categories = await CategoryService.list({
        where: {
          type: {
            $in: opts.categories
          }
        }
      });
      const categoryIds = categories && categories.map(category => category._id);
      if (categoryIds && typeof categoryIds === 'object' && categoryIds.length > 0) {
        opts.where = Object.assign(opts.where || {}, {
          categories: {
            $elemMatch: {
              $in: categoryIds
            }
          }
        });
      }
    }
    return opts;
  }

  static async createOrUpdate(doc) {
    // if (!doc.categories || doc.categories.length <= 0) {
    //   return null;
    // }
    const docId = doc.id || doc._id;
    let oldDoc = null;
    if (docId) {
      oldDoc = await this.get(docId);
    }
    if (oldDoc) {
      doc._id = oldDoc._id;
    }

    // Resolve status
    doc.status = doc.status || PostStatus.published;

    // Resolve Categories
    if (doc.categories) {
      doc.categories = await CategoryService.list({
        where: {
          type: {
            $in: doc.categories
          }
        }
      }).then(categories => categories.map(category => category._id));
    }

    // Resolve images
    if (doc.preview) {
      doc.preview = await ImgurService.create(doc.preview, {
        title: doc.title
      });
    }

    // Resolve content
    if (doc.content) {
      doc.content = await this.replaceImageBase64ToUrl(doc.content);
      doc.content = xss(doc.content);
    }

    // Resolve authors
    if (doc.newAuthor) {
      const newAuthor = ApiHelper.getId(doc.newAuthor._id);
      if (oldDoc) {
        if (oldDoc.authors.every(authorId => authorId !== newAuthor._id.toString())) {
          oldDoc.authors.push(newAuthor);
          doc.authors = oldDoc.authors;
        }
      } else {
        doc.authors = [newAuthor._id];
        await UserService.updateSocialPoint(doc.newAuthor, 5);
      }
      delete doc.newAuthor;
    }

    // Resolve owner
    if (doc.owner) {
      if (!oldDoc) {
        const { owner } = doc;
        doc.owner = doc.owner._id;
        await UserService.updateSocialPoint(owner, 5);
      }
    }

    return super.createOrUpdate(doc);
  }

  static async getByOrder(baseOrder) {
    return super.first({ where: { baseOrder } });
  }

  static async checkNews(user) {
    if (!user.latestReads) {
      user.latestReads = {};
    }
    const categories = await CategoryService.list();
    const news = {};
    await Promise.all(categories.map(
      category => this.getModel().exists({
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

  static async markAsRead(readCategories, user) {
    readCategories.forEach(({ category, latestRead }) => {
      user.dirty = user.dirty || user.latestReads[category] !== new Date(latestRead).getTime();
      user.latestReads[category] = new Date(latestRead).getTime();
    });
  }

  static async checkUnreadPosts(user) {
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
      where: {
        $or: conditions
      }
    });

    return unreadPosts;
  }

  static async seenLatestPost(user, post) {
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


const xss = require('xss');
const { Post } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./Category');
const UserService = require('../user/User');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../../services/third-party/imgur');
const { PostStatus } = require('../../utils/Constants');

module.exports = class extends CRUDService {
  static getModel() {
    return Post;
  }

  static get populate() {
    return ['categories'];
  }

  static async resolveListOptions(opts = ApiHelper.listParams) {
    opts.where = Object.assign(opts.where || {}, {
      status: PostStatus.published
    });
    if (opts.category) {
      const parentCategory = await CategoryService.list({
        limit: 1,
        where: {
          type: opts.category
        }
      });
      if (parentCategory.length <= 0) {
        return null;
      }
      const categories = [
        parentCategory[0]._id,
        ...parentCategory[0].children.map(category => category._id)
      ];
      if (categories && typeof categories === 'object' && categories.length > 0) {
        opts.where = Object.assign(opts.where || {}, {
          categories: {
            $elemMatch: {
              $in: categories
            }
          }
        });
      }
    }
    return opts;
  }

  static async create(doc) {
    if (!doc.categories || doc.categories.length <= 0) {
      return null;
    }
    const docId = doc.id || doc._id;
    let oldDoc = null;
    if (docId) {
      oldDoc = await this.get(docId);
    }

    // Resolve status
    doc.status = doc.status || PostStatus.published;

    // Resolve Categories
    doc.categories = await CategoryService.list({
      where: {
        type: {
          $in: doc.categories
        }
      }
    }).then(categories => categories.map(category => category._id));

    // Resolve images
    if (doc.preview) {
      doc.preview = await ImgurService.create(doc.preview, {
        title: doc.title
      });
    }
    doc.content = await this.replaceImageBase64ToUrl(doc.content);

    // Resolve authors
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

    doc.content = xss(doc.content);

    return oldDoc
      ? super.update(docId, doc)
      : super.create(doc);
  }

  static async replaceImageBase64ToUrl(content) {
    const imgRegexp = /!\[(.+?)\]\((.+?)\)/g;
    const promises = [];
    async function replacer(match, imageName, imageBase64) {
      const promise = ImgurService.create(imageBase64, {
        name: imageName,
        title: imageName
      }).then(imageUrl => `![${imageName}](${imageUrl})`);
      promises.push(promise);
    }
    content.replace(imgRegexp, replacer);
    const data = await Promise.all(promises);
    return content.replace(imgRegexp, () => data.shift());
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

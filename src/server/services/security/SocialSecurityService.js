const HttpErrors = require('http-errors');
const { errorOrFalse } = require('./SecurityHelper');
const SecurityService = require('./SecurityService');
const CategoryService = require('../social/CategoryService');


module.exports = class extends SecurityService {
  static filterUnallowedProperties(post) {
    if (!post || typeof post !== 'object') {
      return null;
    }
    const allowedProps = [
      '_id',
      '__t',
      'title',
      'content',
      'summary',
      'previewPhoto',
      'video',
      'categories',
      'status',
      'experiment',
      'target'
    ];
    Object.keys(post).forEach((key) => {
      if (!allowedProps.includes(key)) {
        delete post[key];
      }
    });
    return post;
  }

  static onlyValidPost(req, throwError = true) {
    const post = req.body;
    if (!post /* || !post.categories || post.categories.length <= 0 */) {
      return errorOrFalse(HttpErrors.BadRequest(), throwError);
    }
    return true;
  }

  static onlyOwner(req, post, throwError = true) {
    const userId = req.session.user._id.toString();
    if (!post || !post.authors || !post.authors.includes || !post.authors.includes(userId)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }

  static onlyOwnerModAdmin(req, post, throwError = true) {
    if (!this.onlyLoggedInUser(req, false)) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    if (this.onlyModOrAdmin(req, false)) {
      return true;
    }
    return this.onlyOwner(req, post, throwError);
  }

  static async onlyPublicOwnerModAdmin(req, post, throwError = true) {
    if (!this.onlyValidPost(req, throwError)) {
      return false;
    }
    if (this.onlyOwnerModAdmin(req, post, false)) {
      return true;
    }
    const publicCategories = await CategoryService.list({
      where: {
        type: {
          $in: ['YourQuestion', 'CommunityShare', 'CommunityRecommed']
        }
      }
    });
    const isOK = post.categories.every(cat => publicCategories.find(pCat => pCat._id === cat._id));
    if (isOK) {
      return errorOrFalse(HttpErrors.Unauthorized(), throwError);
    }
    return true;
  }
};

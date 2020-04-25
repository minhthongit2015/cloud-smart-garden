
const xss = require('xss');
const {
  Social,

  // Intranet
  OneHundredQuotes,

  // Blog
  Post,

  // Garden
  Garden, Station, Record, Plant,

  // AI
  Project, Experiment, ExperimentTarget, Dataset, TrainedModel, Team, Folder,

  // Map
  Place,
  CharityRestaurantMarker, EventMarker, ExpertMarker, FarmMarker,
  FoodStoreMarker, GardenMarker, ToolStoreMarker
} = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const CategoryService = require('./CategoryService');
const UserService = require('../user/User');
const ImgurService = require('../third-party/imgur');
const { PostStatus } = require('../../utils/Constants');
const { ListParams } = require('../../utils/types');


const PostTypes = [
  Social,
  OneHundredQuotes,
  Post,
  Garden, Station, Record, Plant,
  Project, Experiment, ExperimentTarget, Dataset, TrainedModel, Team, Folder,
  Place, CharityRestaurantMarker, EventMarker, ExpertMarker, FarmMarker,
  FoodStoreMarker, GardenMarker, ToolStoreMarker
];

module.exports = class extends CRUDService {
  static get defaultModel() {
    return Social;
  }

  static getModel({ doc, model }) {
    const modelType = model || (doc && doc.__t);
    if (!modelType) {
      return this.defaultModel;
    }
    return PostTypes.find(type => type.modelName === modelType) || this.defaultModel;
  }

  static get populate() {
    return ['categories'];
  }

  static async resolveListOptions({ opts = new ListParams() }) {
    opts.where = Object.assign(opts.where || {}, {
      status: PostStatus.published
    });
    if (opts.categories) {
      opts.categories = JSON.parse(opts.categories);
      const categories = await CategoryService.list({
        opts: {
          where: {
            type: {
              $in: opts.categories
            }
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

  static async createOrUpdate({
    doc, user, model, ...args
  }) {
    const userId = user._id;
    const oldDoc = await this.get({ id: doc._id, model, ...args });
    if (!oldDoc) { // Create
      doc.createdBy = userId;
      doc.owners = [userId];
      doc.managers = [userId];
      doc.authors = [userId];
      // doc.teams = [...];
      await UserService.updateSocialPoint(user, 5);
    } else { // Update
      doc._id = oldDoc._id;
      doc.authors = [...new Set([...oldDoc.authors, userId])];
    }

    // Resolve Categories
    if (doc.categories) {
      const categoryIds = await CategoryService.listByTypes(doc.categories)
        .then(categories => categories.map(category => category._id));
      doc.categories = categoryIds;
    }

    // Resolve images
    if (doc.previewPhoto) {
      doc.previewPhoto = await ImgurService.create(doc.previewPhoto, {
        title: doc.title
      });
    }

    // Resolve content
    if (doc.content) {
      doc.content = await this.replaceImageBase64ToUrl(doc.content);
      doc.content = xss(doc.content);
    }

    return super.createOrUpdate({ doc, model, ...args });
  }
};

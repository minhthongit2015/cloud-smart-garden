const { OneHundredQuotes } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../third-party/imgur');
const { PostStatus } = require('../../utils/Constants');

module.exports = class extends CRUDService {
  static getModel() {
    return OneHundredQuotes;
  }

  static async resolveListOptions(opts = ApiHelper.listParams) {
    opts.where = Object.assign(opts.where || {}, {
      status: PostStatus.published
    });
    return opts;
  }

  static async createOrUpdate(doc) {
    doc.status = doc.status || PostStatus.published;
    doc.owner = ApiHelper.getId(doc.owner);
    if (doc.preview) {
      doc.preview = await ImgurService.create(doc.preview);
    }
    return super.createOrUpdate(doc);
  }
};

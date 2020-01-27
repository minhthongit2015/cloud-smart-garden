// const moment = require('moment');
const ApiHelper = require('../../../utils/ApiHelper');
const { Dataset } = require('../../../models/mongo');
const PostService = require('../../blog/Post');
const RecordService = require('../../garden/Record');


module.exports = class extends PostService {
  static getModel() {
    return Dataset;
  }

  static resolveListOptions(opts = { ...ApiHelper.listParams }) {
    if (opts.records) {
      opts.populate = ['records'];
    } else {
      if (!opts.fields) {
        opts.fields = [];
      }
      opts.fields = [...opts.fields, '-records'];
    }
    return opts;
  }

  static async createOrUpdate(doc) {
    const stationId = ApiHelper.getId(doc.station);
    const { days = [] } = doc;
    const recordsByDays = await RecordService.listByDays(days, stationId, true, true);
    doc.records = recordsByDays.map(record => record._id);
    return super.createOrUpdate(doc);
  }
};

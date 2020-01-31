// const moment = require('moment');
const ApiHelper = require('../../utils/ApiHelper');
const { Dataset } = require('../../models/mongo');
const PostService = require('../blog/Post');
const RecordService = require('../garden/Record');


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
    doc.records = recordsByDays
      .map(record => record._id);
    return super.createOrUpdate(doc);
  }

  static async regenerateRecords(datasetId) {
    const dataset = await this.getWithRecords(datasetId);
    if (!dataset || !dataset.records) {
      return null;
    }
    const records = await Promise.all(dataset.records.map((record) => {
      Object.assign(record, RecordService.generateRawRecord());
      delete record.createdAt;
      delete record.station;
      return RecordService.createOrUpdate(record);
    }));
    return records;
  }

  static async getWithRecords(datasetId) {
    return this.get(datasetId, { populate: ['records'] });
  }
};

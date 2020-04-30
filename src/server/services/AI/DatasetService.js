// const moment = require('moment');
const ApiHelper = require('../../utils/ApiHelper');
const { Dataset } = require('../../models/mongo');
const SocialService = require('../social/SocialService');
const RecordService = require('../garden/RecordService');
const { ListParams } = require('../../utils/types');


module.exports = class extends SocialService {
  static getModel() {
    return Dataset;
  }

  static resolveListOptions({ opts = new ListParams() } = {}) {
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

  static async createOrUpdate({ doc, user, ...args }) {
    const stationId = ApiHelper.getId(doc.station);
    const { days = [] } = doc;
    const recordsByDays = await RecordService.listByDays(days, stationId, true, true);
    doc.records = recordsByDays
      .map(record => record._id);
    return super.createOrUpdate({ doc, user, ...args });
  }

  static async regenerateRecords(datasetId) {
    const dataset = await this.getWithRecords(datasetId);
    if (!dataset || !dataset.records) {
      return null;
    }
    const records = await Promise.all(dataset.records.map((record) => {
      Object.assign(record, RecordService.generateRawRecord(record.createdAt, record.station));
      delete record.createdAt;
      delete record.station;
      return RecordService.createOrUpdate({ doc: record });
    }));
    return records;
  }

  static async getWithRecords(datasetId) {
    return this.get({ id: datasetId, opts: { populate: ['records'] } });
  }
};

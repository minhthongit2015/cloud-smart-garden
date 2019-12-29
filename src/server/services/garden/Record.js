// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Record } = require('../../models/mongo');
const CRUDService = require('../CRUDService');

module.exports = class extends CRUDService {
  // moment(moment.now()).diff(lastRecord[0].createdAt, 'minute') < 10
  static getModel() {
    return Record;
  }
};

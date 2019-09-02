// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('./environment');
const ApiHelper = require('../../utils/ApiHelper');
const ConverterFactory = require('../../models/converters/converter-factory');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    const rawData = await EnvironmentService.list(opts);
    // let now = Date.now();
    // await Promise.all(rawData.map((row) => {
    //   row.createdAt = now;
    //   now += 60 * 1000; // 1 min
    //   return row.save();
    // }));
    return ConverterFactory.get('env-dataset').convert(rawData);
  }

  static async create(object) {
    return EnvironmentService.create(object);
  }

  static update() {

  }

  static delete() {

  }
};

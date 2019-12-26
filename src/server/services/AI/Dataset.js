// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('../garden/Environment');
const ApiHelper = require('../../utils/ApiHelper');
const ConverterFactory = require('../../models/converters/ConverterFactory');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    const rawData = await EnvironmentService.list(opts);
    // let now = new Date();
    // now = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    // await Promise.all(rawData.map((row) => {
    //   row.createdAt = now;
    //   now += 60 * 10 * 1000; // 10 min
    //   return row.save();
    // }));
    return ConverterFactory.get('env-dataset').convert(rawData);
  }

  static async create(object) {
    return EnvironmentService.create(object);
  }

  static async update(datasetId, dataset) {
    const envs = ConverterFactory.get('dataset-env').convert(dataset);
    return Promise.all(envs.map(env => EnvironmentService.update({
      createdAt: env.createdAt
    }, {
      state: env.state
    })));
  }

  static delete() {

  }
};

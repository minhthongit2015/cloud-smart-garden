// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('../Environment');
const ApiHelper = require('../../utils/ApiHelper');
const ConverterFactory = require('../../models/converters/converter-factory');
const AIService = require('./ai-core');

module.exports = class {
  static async list(opts = ApiHelper.listParams) {
    const rawData = await EnvironmentService.list(opts);
    return ConverterFactory.get('experiment').convert(rawData);
  }

  static async create(object) {
    return EnvironmentService.create(object);
  }

  static update() {

  }

  static delete() {

  }

  static build(experimentId, buildOptions = { }) {
    return AIService.build(buildOptions);
  }
};

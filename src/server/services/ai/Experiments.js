// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('../Environment');
const ApiHelper = require('../../utils/ApiHelper');
const ConverterFactory = require('../../models/converters/converter-factory');
const AIService = require('./ai-core');
const ModelService = require('./Model');

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

  static async build(experimentId, buildOptions = { }) {
    return AIService.build(buildOptions);
  }

  static async save(experimentId, model) {
    return ModelService.save(model, `file://./assets/${experimentId}/model`);
  }

  static async load(experimentId) {
    return ModelService.load(`file://./assets/${experimentId}/model`);
  }
};

// const ApiHelper = require('../../utils/ApiHelper');
const AIService = require('./ai-core');
const ModelService = require('./Model');

module.exports = class {
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

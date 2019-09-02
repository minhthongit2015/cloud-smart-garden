// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('../../Environment');
const ApiHelper = require('../../../utils/ApiHelper');
const ConverterFactory = require('../../../models/converters/converter-factory');
const NeralNetwork = require('./NeuralNetwork');
const Trainer = require('./Trainer');

module.exports = class {
  static async build(opts = ApiHelper.listParams) {
    const rawData = await EnvironmentService.list(opts);
    const features = ['temperature', 'humidity', 'light', 'timestamp'];
    const dataset = ConverterFactory.get('env-dataset').convert(rawData, {
      features
    });
    const model = NeralNetwork.getModel({
      numFeatures: 3,
      numOutput: 1
    });
    Trainer.train(model);
    model.dispose();
    return model;
  }

  static async create(object) {
    return EnvironmentService.create(object);
  }

  static update() {

  }

  static delete() {

  }
};

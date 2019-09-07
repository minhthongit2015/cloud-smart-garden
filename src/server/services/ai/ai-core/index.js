// const { Environment } = require('../../models/mongo');
const EnvironmentService = require('../../Environment');
const ApiHelper = require('../../../utils/ApiHelper');
const ConverterFactory = require('../../../models/converters/converter-factory');
const NeralNetwork = require('./NeuralNetwork');
const Trainer = require('./Trainer');

module.exports = class {
  static async build(opts = ApiHelper.listParams) {
    const rawData = await EnvironmentService.list(opts);
    const features = {
      'state.temperature': 'temperature',
      'state.humidity': 'humidity',
      createdAt: 'time'
    };
    const trainingSet = ConverterFactory.get('env-dataset')
      .convert(rawData, { features });
    trainingSet.rows.forEach((row) => {
      if (row[2] && row[2].getTime) {
        row[2] = row[2].getTime();
      }
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

  static async save() {
    // const saveResult = await model.save('localstorage://my-model-1');
    // const model = await tf.loadLayersModel('localstorage://my-model-1');
  }
};

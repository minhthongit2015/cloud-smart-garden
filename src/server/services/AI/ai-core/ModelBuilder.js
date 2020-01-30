const { TrainingSetInterface, ModelOptionsInterface } = require('../AIInterfaces');
const NeralNetwork = require('./NeuralNetwork');


module.exports = class {
  static buildForTrainingSet(type,
    trainingSet = { ...TrainingSetInterface },
    modelOpts = { ...ModelOptionsInterface }) {
    return this.buildNeuralForTrainingSet(trainingSet, modelOpts);
  }

  static buildNeuralForTrainingSet(
    trainingSet = { ...TrainingSetInterface },
    modelOpts = { ...ModelOptionsInterface }
  ) {
    const numFeatures = trainingSet.features.length;
    const numOutputs = trainingSet.labels.length;
    const model = NeralNetwork.createModel({
      numFeatures,
      numOutputs,
      layers: modelOpts.layers
    });
    model.compile({
      optimizer: modelOpts.optimizer,
      loss: modelOpts.loss,
      metrics: modelOpts.metrics || ['accuracy']
    });
    return model;
  }
};

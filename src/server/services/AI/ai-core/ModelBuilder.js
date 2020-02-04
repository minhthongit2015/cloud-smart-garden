const { TrainingSetInterface, BuildOptionsInterface } = require('../utils/AITypes');
const NeralNetwork = require('./NeuralNetwork');
const AlgorithmMapper = require('../utils/AlgorithmMapper');


module.exports = class {
  static buildForTrainingSet(type,
    trainingSet = { ...TrainingSetInterface },
    buildOpts = { ...BuildOptionsInterface }) {
    return this.buildNeuralForTrainingSet(trainingSet, buildOpts);
  }

  static buildNeuralForTrainingSet(
    trainingSet = { ...TrainingSetInterface },
    buildOpts = { ...BuildOptionsInterface }
  ) {
    const numFeatures = trainingSet.features.length;
    const numOutputs = trainingSet.labels.length;
    const model = NeralNetwork.buildModel({
      numFeatures,
      numOutputs,
      activation: AlgorithmMapper(buildOpts.activation),
      layers: buildOpts.layers
    });
    return this.compileModel(model, buildOpts);
  }

  static compileModel(
    model,
    compileOpts = { ...BuildOptionsInterface }
  ) {
    model.compile({
      optimizer: AlgorithmMapper(compileOpts.optimizer),
      loss: AlgorithmMapper(compileOpts.loss),
      metrics: compileOpts.metrics || ['accuracy']
    });
    return model;
  }
};

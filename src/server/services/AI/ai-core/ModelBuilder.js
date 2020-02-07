const { TrainingSet, BuildModelOptions } = require('../utils/AITypes');
const NeralNetwork = require('./NeuralNetwork');
const AlgorithmMapper = require('../utils/AlgorithmMapper');


module.exports = class {
  static buildForTrainingSet(type,
    trainingSet = new TrainingSet(),
    buildOpts = { ...BuildModelOptions }) {
    return this.buildNeuralForTrainingSet(trainingSet, buildOpts);
  }

  static buildNeuralForTrainingSet(
    trainingSet = new TrainingSet(),
    buildOpts = new BuildModelOptions()
  ) {
    const numFeatures = trainingSet.features.length;
    const numOutputs = trainingSet.labels.length;
    const model = NeralNetwork.buildModel({
      numFeatures,
      numOutputs,
      activation: AlgorithmMapper(buildOpts.activation),
      layers: buildOpts.layers,
      isClassification: buildOpts.algorithm === 'neuralNetwork'
    });
    return this.compileModel(model, buildOpts);
  }

  static compileModel(
    model,
    compileOpts = new BuildModelOptions()
  ) {
    model.compile({
      optimizer: AlgorithmMapper(compileOpts.optimizer),
      loss: AlgorithmMapper(compileOpts.loss),
      metrics: compileOpts.metrics || ['accuracy']
    });
    return model;
  }

  static verifyModel(
    model,
    trainingSet = new TrainingSet(),
    buildOpts = new BuildModelOptions()
  ) {
    if (!model) return null;
    const numFeatures = trainingSet.features.length;
    const numOutputs = trainingSet.labels.length;
    const activation = AlgorithmMapper(buildOpts.activation);
    const { layers } = buildOpts;
    if (numFeatures !== model.input.shape[1]
      || numOutputs !== model.output.shape[1]) {
      return null;
    }
    const isSameLayers = model.layers.length - 2 === layers.length
      && model.layers.slice(1, -1)
        .every((layer, i) => layer.units === layers[i]
          && layer.activation.getClassName().toLocaleLowerCase()
            === activation.toLocaleLowerCase());
    if (!isSameLayers) {
      return null;
    }
    return model;
  }
};

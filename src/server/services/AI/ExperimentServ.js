const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/Post');
const { Experiment } = require('../../models/mongo');
const ModelService = require('./ModelServ');
const {
  ModelBuilder, TrainingSet, Trainer, NeralNetwork
} = require('./ai-core');
const DatasetService = require('./DatasetServ');
const SyncService = require('../sync');
const { BuildExperimentRequest } = require('./utils/AITypes');
const BuiltInExperimentTargets = require('./utils/BuiltInExperimentTargets');


module.exports = class extends PostService {
  static getModel() {
    return Experiment;
  }

  static async buildAndTrain(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const models = await Promise.all(
      opts.targets.map(target => this.buildExperimentByTarget(target, dataset, opts))
    );
    return models;
  }

  static async buildExperimentByTarget(target, dataset, opts = new BuildExperimentRequest()) {
    const experimentTarget = BuiltInExperimentTargets.find(targetI => targetI.key === target.key);
    if (!experimentTarget) return null;
    const trainingSet = TrainingSet.fromDataset(dataset, {
      features: experimentTarget.features,
      labels: experimentTarget.labels
    });
    opts.metrics = ['accuracy']; // Force to use accuracy for now
    const model = ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);
    await Trainer.train(model, trainingSet, opts, {
      onBatchEnd: (event, { batch, accuracy }) => {
        SyncService.emit('training', { batch, accuracy });
      }
    });
    return model;
  }

  static async save(experimentId, model) {
    return ModelService.save(model, `file://./assets/${experimentId}/models`);
  }

  static async load(experimentId) {
    return ModelService.load(`file://./assets/${experimentId}/models`);
  }

  static async test() {
    const numRecords = 432;
    const numFeatures = 1;
    const numOutputs = 2;
    const model = NeralNetwork.createModel({
      numFeatures,
      numOutputs,
      layers: [2]
    });
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Train
    function* dataGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.randomNormal([1, numFeatures]);
      }
    }
    function* labelsGen() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.randomUniform([1, numOutputs]);
      }
    }

    const xs = tf.data.generator(dataGen);
    const ys = tf.data.generator(labelsGen);
    const dataset = tf.data.zip({ xs, ys }).shuffle(100).batch(numRecords / 4);

    function onBatchEnd(batch, logs) {
      console.log('Accuracy', logs.acc);
    }

    const info = await model.fitDataset(dataset, {
      epochs: 5,
      callbacks: { onBatchEnd }
    });
    console.log('Final accuracy', info.history.acc);

    return model;
  }
};

const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/Post');
const { Experiment } = require('../../models/mongo');
const ModelService = require('./ModelServ');
const {
  ModelBuilder, TrainingSet, Trainer, NeralNetwork
} = require('./ai-core');
const DatasetService = require('./DatasetServ');
const SyncService = require('../sync');
const { BuildExperimentRequest, ExperimentTarget } = require('./utils/AITypes');
const BuiltInExperimentTargets = require('./BuiltInExperimentTargets');


module.exports = class extends PostService {
  static getModel() {
    return Experiment;
  }

  static async buildAndTrain(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const trainedModels = await Promise.all(
      opts.targets.map(async (target) => {
        let savedModel = null;
        if (opts.saveModel) {
          savedModel = await this.load(experimentId, target);
        }
        return this.buildAndTrainForTarget(target, dataset, savedModel, opts);
      })
    );
    if (trainedModels && opts.saveModel) {
      await Promise.all(
        trainedModels.map(
          (trainedModel, index) => this.save(trainedModel, experimentId, opts.targets[index])
        )
      );
    }
    return trainedModels;
  }

  static findExperimentTarget(target) {
    return BuiltInExperimentTargets.find(targetI => targetI.key === target.key);
  }

  static async buildAndTrainForTarget(
    target, dataset, savedModel, opts = new BuildExperimentRequest()
  ) {
    const experimentTarget = this.findExperimentTarget(target);
    if (!experimentTarget) return null;

    const trainingSet = this.buildTrainingSetForTarget(dataset, experimentTarget);

    opts.metrics = ['accuracy']; // Force to use accuracy for now
    let model = ModelBuilder.compileModel(savedModel, opts)
      || ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);

    try {
      await this.trainModel(model, trainingSet, opts);
    } catch {
      model = ModelBuilder.buildForTrainingSet('neural', trainingSet, opts);
      await this.trainModel(model, trainingSet, opts);
    }

    return model;
  }

  static buildTrainingSetForTarget(dataset, experimentTarget = new ExperimentTarget()) {
    return TrainingSet.fromDataset(dataset, {
      features: experimentTarget.features,
      labels: experimentTarget.labels
    });
  }

  static async trainModel(model, trainingSet, opts = new BuildExperimentRequest()) {
    return Trainer.train(model, trainingSet, opts, {
      onBatchEnd: (event, { batch, accuracy }) => {
        if (!opts.highResolution) return;
        SyncService.emit('training', { batch, accuracy });
      },
      onEpochEnd: (event, { batch, accuracy }) => {
        if (opts.highResolution) return;
        SyncService.emit('training', { batch, accuracy });
      },
      onStart: () => {
        SyncService.emit('startTraining');
      }
    });
  }

  static async stopTraining() {
    if (!global.model) return;
    global.model.stopTraining = true;
    await new Promise((resolve) => {
      global.onTrainEnd = resolve;
    });
    delete global.model;
  }

  static async save(model, experimentId, target) {
    if (!model) return null;
    return ModelService.save(model, `${experimentId}-${target.key}`);
  }

  static async load(experimentId, target) {
    return ModelService.load(`${experimentId}-${target.key}`);
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

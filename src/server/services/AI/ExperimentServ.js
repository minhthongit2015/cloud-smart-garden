const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/PostServ');
const { Experiment } = require('../../models/mongo');
const ModelService = require('./ModelServ');
const {
  ModelBuilder, TrainingSet, Trainer
} = require('./ai-core');
const DatasetService = require('./DatasetServ');
const SyncService = require('../sync');
const { BuildExperimentRequest, ExperimentTarget } = require('./utils/AITypes');
const { get } = require('../../utils');


module.exports = class extends PostService {
  static getModel() {
    return Experiment;
  }

  static async buildAndTrain(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const trainedModels = await Promise.all(
      opts.targets.map(async (target) => {
        let savedModel = null;
        if (opts.continuous) {
          savedModel = await ModelService.loadForExperimentAndTarget(experimentId, target);
        }
        return this.buildAndTrainForTarget(target, dataset, savedModel, opts);
      })
    );
    if (trainedModels) {
      await Promise.all(
        trainedModels.map(
          (trainedModel, index) => ModelService.saveForExperimentAndTarget(
            trainedModel, experimentId, opts.targets[index]
          )
        )
      );
    }
    return trainedModels;
  }

  static async buildAndTrainForTarget(
    target, dataset, savedModel, opts = new BuildExperimentRequest()
  ) {
    if (!target || !dataset) return null;
    const trainingSet = this.buildTrainingSetForTarget(dataset, target);

    opts.metrics = ['accuracy']; // Force to use accuracy for now
    savedModel = ModelBuilder.verifyModel(savedModel, trainingSet, opts);
    let model = (savedModel && ModelBuilder.compileModel(savedModel, opts))
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
      onBatchEnd: (event, info) => {
        SyncService.emit('trainProgress', info);
      },
      onEpochEnd: (event, info) => {
        SyncService.emit('trainProgress', info);
      },
      onTrainBegin: (event, info) => {
        SyncService.emit('trainBegin', info);
      },
      onTrainEnd: (event, info) => {
        SyncService.emit('trainEnd', info);
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

  static async compare(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const trainingSets = await Promise.all(
      opts.targets.map(async (target) => {
        const savedModel = await ModelService.loadForExperimentAndTarget(experimentId, target);
        return this.compareForTarget(target, dataset, savedModel);
      })
    );
    return trainingSets;
  }

  static async compareForTarget(target, dataset, savedModel) {
    if (!target || !dataset || !savedModel) return null;
    const trainingSet = this.buildTrainingSetForTarget(dataset, target);
    tf.tidy(() => {
      trainingSet.predict = savedModel.predict(
        tf.tensor2d(trainingSet.xs, [trainingSet.xs.length, trainingSet.features.length])
      ).arraySync();
    });

    const labelSample = get(dataset.records[0], trainingSet.labels[0][0]);
    if (typeof labelSample === 'boolean') {
      trainingSet.predict = trainingSet.predict.map(
        row => (row[0] > row[1] ? 1 : 0)
      );
    }

    return trainingSet;
  }
};

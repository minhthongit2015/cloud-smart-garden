const tf = require('@tensorflow/tfjs-node');
const SocialService = require('../social/SocialService');
const { Experiment } = require('../../models/mongo');
const ModelService = require('./ModelService');
const DatasetService = require('./DatasetService');
const TrainingTaskService = require('./TrainingTaskService');
const Trainer = require('./training/Trainer');
const { BuildExperimentRequest } = require('./utils/AITypes');
const TargetService = require('./TargetService');
const TrainingSetService = require('./TrainingSetService');


const { get } = require('../../utils');


module.exports = class extends SocialService {
  static getModel() {
    return Experiment;
  }

  static async buildAndTrain({
    experiment, target, trainingSetOptions, modelOptions, trainOptions
  } = new BuildExperimentRequest()) {
    await TrainingTaskService.scheduleTrainingTask({
      experiment,
      target,
      trainingSetOptions,
      modelOptions,
      trainOptions
    });
    Trainer.notifyNewTaskScheduled();
  }

  static async stopTraining(experiment, target) {
    Trainer.stopTraining({ experiment, target });
  }

  static async compare(experimentId, opts = new BuildExperimentRequest()) {
    const dataset = await DatasetService.getWithRecords(opts.datasetId);
    const trainingSets = await Promise.all(
      [opts.target].map(async (target) => {
        const savedModel = await ModelService.loadByExperimentAndTarget(experimentId, target);
        return this.compareForTarget(target, dataset, savedModel);
      })
    );
    return trainingSets;
  }

  static async compareForTarget(target, dataset, savedModel) {
    if (!target || !dataset || !savedModel) return null;
    const trainingSet = await this.buildTrainingSetForTarget(dataset, target);
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

  static async buildTrainingSetForTarget(datasetId, targetId) {
    const dataset = await DatasetService.getWithRecords(datasetId);
    const target = await TargetService.getTarget(targetId);
    return TrainingSetService.fromDataset(
      dataset,
      {
        features: target.features,
        labels: target.labels
      }
    );
  }
};

const tf = require('@tensorflow/tfjs-node');
const { dispatchEvent } = require('../../../utils');
const TrainingTask = require('./TrainingTask');
const TrainingTaskService = require('../TrainingTaskService');
const { TrainEvents } = require('../utils/AIEvents');
const random = require('../../../utils/random');
const SocialSyncService = require('../../sync/SocialSyncService');
const ModelBuilder = require('../ai-core/ModelBuilder');
const ModelService = require('../ModelService');
const DatasetService = require('../DatasetService');
const TargetService = require('../TargetService');
const TrainingSetService = require('../TrainingSetService');
const ExperimentService = require('../ExperimentService');
const { BuildExperimentRequest } = require('../utils/AITypes');
const { get } = require('../../../utils');


module.exports = class {
  static get Events() {
    return TrainEvents;
  }

  static runningTasks = [];

  static poolSize = 10;

  static findRunningTask(task) {
    return task && this.runningTasks.find(taskI => taskI._id === task._id);
  }

  static findRuningTaskIndex(task) {
    return (task && this.runningTasks.findIndex(taskI => taskI._id === task._id)) || -1;
  }

  static isTaskRunning(task) {
    return task && this.runningTasks.some(taskI => taskI._id === task._id);
  }

  static addRunningTask(newTask) {
    const existedTask = this.findRunningTask(newTask);
    if (!existedTask) {
      this.runningTasks.push(newTask);
      return true;
    }
    return false;
  }

  static removeRunningTask(task) {
    const taskIndex = this.runningTasks.findIndex(taskI => taskI._id === task._id);
    if (taskIndex >= 0) {
      this.runningTasks.splice(taskIndex, 1);
    }
  }

  static mapRawTask(rawTask) {
    return rawTask
      ? new TrainingTask(rawTask)
      : null;
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
    this.notifyNewTaskScheduled();
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

  static async notifyNewTaskScheduled() {
    await this.runNextTask();
  }

  static async runNextTask() {
    if (this.runningTasks.length < this.poolSize) {
      const newTask = this.mapRawTask(await TrainingTaskService.getNextTask());
      if (!newTask) {
        return;
      }

      const existedTask = this.findRunningTask(newTask);
      if (this.isTaskRunning(existedTask)) {
        await existedTask.stop();
      }

      const nextTask = existedTask || newTask;

      await TrainingTaskService.markTaskIsRunning(nextTask);
      this.addRunningTask(nextTask);
      this.runTrainingTask(nextTask);
    }
    await this.runNextTask();
  }

  static async runTrainingTask(task = new TrainingTask()) {
    const listeners = {
      onTrainBegin: async (event, taskz) => {
        const experiment = await ExperimentService.get({ id: taskz.experiment });
        SocialSyncService.sendToOwners(experiment, 'trainBegin', taskz);
      },
      onBatchEnd: async (event, info, taskz) => {
        const experiment = await ExperimentService.get({ id: taskz.experiment });
        SocialSyncService.sendToOwners(experiment, 'trainProgress', info);
      },
      onEpochEnd: async (event, info, taskz) => {
        const experiment = await ExperimentService.get({ id: taskz.experiment });
        SocialSyncService.sendToOwners(experiment, 'trainProgress', info);
      },
      onTrainEnd: async (event, info, taskz) => {
        await ModelService.saveTemporaryModel(taskz.model, taskz._id);
        await this.handleTaskCompleted(taskz);
        const experiment = await ExperimentService.get({ id: taskz.experiment });
        SocialSyncService.sendToOwners(experiment, 'trainEnd', info);
      }
    };
    await this.prepareTrainingSet(task);
    await this.prepareModel(task);

    try {
      await this.train(task, listeners);
    } catch {
      await ModelService.deleteTemporaryModel(task._id);
      await this.prepareModel(task);
      await this.train(task, listeners);
    }
  }

  static async handleTaskCompleted(task) {
    await TrainingTaskService.markTaskIsCompleted(task);
    this.removeRunningTask(task);
  }

  static async prepareTrainingSet(task = new TrainingTask()) {
    const { trainingSetOptions: { dataset: datasetId }, target: targetId } = task;
    const dataset = await DatasetService.getWithRecords(datasetId);
    const target = await TargetService.getTarget(targetId);
    task.trainingSet = TrainingSetService.fromDataset(
      dataset,
      {
        features: target.features,
        labels: target.labels
      }
    );
  }

  static async prepareModel(task = new TrainingTask()) {
    let savedModel = null;
    if (task.trainOptions.isContinuous) {
      const previousTask = await TrainingTaskService.getPreviousTask(task);
      if (previousTask) {
        savedModel = previousTask && await ModelService.loadTemporaryModel(previousTask._id);
      }
    }
    savedModel = ModelBuilder.verifyModel(savedModel, task.trainingSet, task.modelOptions);
    task.model = (savedModel && ModelBuilder.compileModel(savedModel, task.modelOptions))
      || ModelBuilder.buildForTrainingSet('neural', task.trainingSet, task.modelOptions);
  }

  static async train(
    task = new TrainingTask(),
    listeners
  ) {
    const {
      model, trainingSet, trainOptions
    } = task;

    const numRecords = trainingSet.xs.length;
    function* featuresGenerator() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor(trainingSet.xs[i], [1, trainingSet.features.length]);
      }
    }
    function* labelsGenerator() {
      for (let i = 0; i < numRecords; i++) {
        yield tf.tensor(trainingSet.ys[i], [1, trainingSet.labels.length]);
      }
    }

    const xs = tf.data.generator(featuresGenerator);
    const ys = tf.data.generator(labelsGenerator);
    const dataset = tf.data.zip({ xs, ys })
      .shuffle(+trainOptions.batchSize, random.int(1, 999999), true)
      .batch(+trainOptions.batchSize || 36);

    // Train
    function handleBatchEnd(batch, logs) {
      logs.batch = batch;
      dispatchEvent(TrainEvents.batchEnd, { listeners }, logs, task);
    }
    function handleEpochEnd(epoch, logs) {
      logs.epoch = epoch;
      dispatchEvent(TrainEvents.epochEnd, { listeners }, logs, task);
    }

    dispatchEvent(TrainEvents.trainBegin, { listeners }, task);
    let info;
    try {
      info = await model.fitDataset(dataset, {
        epochs: +trainOptions.epochs || 15,
        callbacks: {
          onBatchEnd: handleBatchEnd,
          onEpochEnd: handleEpochEnd
        }
      });
    } catch (error) {
      throw error;
    } finally {
      task.notifyStopped();
    }
    console.log('Final accuracy', info.history.acc);
    console.log('Final loss', info.history.loss);
    dispatchEvent(TrainEvents.trainEnd, { listeners }, info.history, task);

    return info;
  }

  static async stopTraining({ experiment, target }) {
    const runningTasks = await TrainingTaskService.list({
      opts: {
        where: {
          experiment,
          target
        }
      }
    });
    return Promise.all(
      runningTasks.map((taskI) => {
        const existedTask = this.findRunningTask(taskI);
        if (!existedTask) return null;
        return existedTask.stop();
      })
    );
  }
};

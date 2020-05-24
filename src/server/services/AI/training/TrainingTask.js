const random = require('../../../utils/random');

const {
  TrainingSet,
  TrainOptions,
  TrainListeners,
  BuildModelOptions,
  BuildTrainingSetOptions
} = require('../utils/AITypes');


class TrainingTask {
  _id;

  experiment = '';

  target = '';

  trainingSetOptions = new BuildTrainingSetOptions();

  modelOptions = new BuildModelOptions();

  trainOptions = new TrainOptions();

  model;

  trainingSet = new TrainingSet();

  listeners = new TrainListeners();

  constructor({
    _id, experiment, target, modelOptions, trainingSetOptions, trainOptions
  }) {
    this._id = _id || random.hex(10);
    this.experiment = experiment;
    this.target = target;
    this.trainingSetOptions = trainingSetOptions;
    this.modelOptions = modelOptions;
    this.trainOptions = trainOptions;
  }

  async stop() {
    this.model.stopTraining = true;
    return new Promise((resolve) => {
      this.resolveStopped = resolve;
    });
  }

  notifyStopped() {
    if (this.resolveStopped) {
      this.resolveStopped();
    }
  }
}

module.exports = TrainingTask;

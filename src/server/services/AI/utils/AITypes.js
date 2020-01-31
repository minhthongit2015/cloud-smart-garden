/* eslint-disable lines-between-class-members */


exports.BuildExperimentRequest = class {
  targets = [];

  // Dataset
  datasetId = '';

  // Model
  algorithm = '';
  optimizer = '';
  loss = '';
  activation = '';
  layers = [];
  metrics = ['accruracy'];

  // Train
  epochs = 0;
  batchSize = 0;

  highResolution = false;
  saveModel = false;
};

exports.ExperimentTarget = class {
  key = '';
  features = [];
  labels = [];
  constructor(key, features, labels) {
    this.key = key;
    this.features = features;
    this.labels = labels;
  }
};

exports.Dataset = class {
  records = [{
    createdAt: '',
    state: {}
  }]
};

exports.TrainingSet = class {
  features = [];
  labels = [];
  xs = [];
  ys = [];
};

exports.BuildModelOptions = class {
  optimizer = '';
  loss = '';
  activation = '';
  layers = [];
  metrics = ['accruracy'];
};

exports.TrainOptions = class {
  epochs = 0;
  batchSize = 0;
};

exports.TrainListeners = class {
  onStart = null;
  onBatchEnd = null;
  onEnd =null;
};


exports.ListenersInterface = {
  onStart: null,
  onBatchEnd: null,
  onEnd: null
};

exports.DatasetInterface = {
  records: [{
    createdAt: '',
    state: null
  }]
};

exports.TrainingSetInterface = {
  features: null,
  labels: null,
  xs: null,
  ys: null
};

exports.RequestBuildInterface = {
  algorithm: '',

  optimizer: '',
  loss: '',
  activation: '',
  metrics: null,
  layers: '',

  epochs: 0,
  batchSize: 0,

  dataset: '',
  targets: ''
};

exports.BuildOptionsInterface = {
  optimizer: '',
  loss: '',
  activation: '',
  metrics: null,
  layers: null
};

exports.TrainOptionsInterfaces = {
  epochs: 0,
  batchSize: 0
};

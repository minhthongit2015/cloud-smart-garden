
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

exports.BuildOptionsInterface = {
  algorithm: '',

  optimizer: '',
  loss: '',
  activation: '',
  metrics: null,
  layers: null,

  dataset: '',
  targets: ''
};

exports.ModelOptionsInterface = {
  optimizer: '',
  loss: '',
  activation: '',
  metrics: null,
  layers: null
};

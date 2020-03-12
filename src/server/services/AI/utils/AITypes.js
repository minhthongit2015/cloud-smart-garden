/* eslint-disable no-unused-vars */
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
  continuous = false;
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
    state: {},
    station: ''
  }]
};

exports.TrainingSet = class {
  features = [];
  labels = [];
  xs = [];
  ys = [];
};

const InputContext = class {
  startTime = null;
  record = null;
  params = null;
};
exports.InputContext = InputContext;

exports.DataUtilNode = class {
  key = '';
  inputType = Date;
  outputType = Number;
  name = '';
  description = '';
  defaultInput = {
    from: ''
  };
  params = [
    {
      type: Date,
      name: 'Mốc thời gian',
      from: 'createdAt',
      description: 'Thời điểm trồng.'
    },
    {
      type: String,
      name: 'Tính theo',
      description: 'Đơn vị thời gian',
      options: ['minutes', 'days'],
      defaultValue: 'minustes'
    }
  ];

  // eslint-disable-next-line class-methods-use-this
  execute(inputValue, context = new InputContext(), ...params) {
    return inputValue;
  }
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

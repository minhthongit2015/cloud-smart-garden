/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */


class ExperimentTarget {
  key = '';
  features = [];
  labels = [];
  constructor(key, features, labels) {
    this.key = key;
    this.features = features;
    this.labels = labels;
  }
}

class Dataset {
  records = [{
    createdAt: '',
    state: {},
    station: ''
  }]
}

class TrainingSet {
  features = [];
  labels = [];
  xs = [];
  ys = [];
}

class InputContext {
  startTime = null;
  record = null;
  params = null;
}

class DataUtilNode {
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
}

class BuildTrainingSetOptions {
  dataset = '';
}

class BuildModelOptions {
  activation = '';
  layers = [];
  loss = '';
  optimizer = '';
  metrics = ['accruracy'];
}

class TrainOptions {
  epochs = 0;
  batchSize = 0;
  isContinuous = false;
}

class TrainListeners {
  onStart = null;
  onBatchEnd = null;
  onEnd =null;
}

class BuildExperimentRequest {
  experiment = '';
  target = '';
  trainingSetOptions = new BuildTrainingSetOptions();
  modelOptions = new BuildModelOptions();
  trainOptions = new TrainOptions();
}

exports.Dataset = Dataset;
exports.TrainingSet = TrainingSet;
exports.TrainListeners = TrainListeners;
exports.BuildModelOptions = BuildModelOptions;
exports.TrainOptions = TrainOptions;
exports.DataUtilNode = DataUtilNode;
exports.InputContext = InputContext;
exports.BuildTrainingSetOptions = BuildTrainingSetOptions;
exports.BuildExperimentRequest = BuildExperimentRequest;
exports.ExperimentTarget = ExperimentTarget;

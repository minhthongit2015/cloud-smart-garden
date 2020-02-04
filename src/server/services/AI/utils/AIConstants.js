const { autoKey } = require('../../../utils');
const DataUtils = require('./DataUtils');


exports.Algorithms = {
  neuralNetwork: { key: '', name: 'Neural Network' },
  linearRegression: { key: '', name: 'Linear Regression' },
  polymonialRegression: { key: '', name: 'Polynomial Regression' }
};
autoKey(this.Algorithms);

exports.Optimizers = require('../algorithms/Optimizers');
exports.Losses = require('../algorithms/Losses');
exports.Activations = require('../algorithms/Activations');

exports.ExperimentTargetTypes = {
  classification: {
    key: '',
    name: 'Phân loại (bật/tắt)',
    description: 'Dự đoán các trường hợp bật, tắt..',
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: Object.values(this.Optimizers),
    losses: [this.Losses.categoricalCrossentropy],
    activations: [
      this.Activations.relu, this.Activations.relu6, this.Activations.softmax, this.Activations.tanh
    ]
  },
  regression: {
    key: '',
    name: 'Nội suy',
    description: 'Tính toán lượng mức (VD: 1000 ppm, 5000 lux)',
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: Object.values(this.Optimizers),
    losses: [
      this.Losses.absoluteDifference, this.Losses.meanSquaredError,
      this.Losses.logLoss, this.Losses.huberLoss, this.Losses.hingeLoss
    ],
    activations: [this.Activations.linear]
  }
};
autoKey(this.ExperimentTargetTypes);

exports.ExperimentTargets = {
  nutrient: {
    key: '',
    name: 'Huấn luyện Dinh dưỡng',
    description: 'Tự động điều chỉnh dinh dưỡng tối ưu theo từng giai đoạn sinh trưởng của cây trồng.',
    type: this.ExperimentTargetTypes.regression,
    features: [
      ['createdAt', DataUtils.fromStart]
    ],
    labels: [
      ['state.nutri', DataUtils.toNumber]
    ],
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: [this.Optimizers.adam],
    losses: [this.Losses.absoluteDifference],
    activations: [this.Activations.linear],
    layers: []
  },
  light: {
    key: '',
    name: 'Huấn luyện Ánh sáng',
    description: 'Tự động cung cấp ánh sáng quang hợp cho cây của bạn nếu cần thiết.',
    type: this.ExperimentTargetTypes.classification,
    features: [
      ['state.light', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.led', DataUtils.toNumber],
      ['state.led', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: [this.Optimizers.adam],
    losses: [this.Losses.categoricalCrossentropy],
    activations: [this.Activations.relu],
    layers: [10, 8, 9, 10, 8, 7, 10, 9, 9, 9]
  },
  temperature: {
    key: '',
    name: 'Huấn luyện Nhiệt độ',
    description: 'Tự động phun sương hoặc bật quạt làm mát cho cây của bạn khi nhiệt độ tăng cao.',
    type: this.ExperimentTargetTypes.classification,
    features: [
      ['state.temperature', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.fan', DataUtils.toNumber],
      ['state.fan', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: [this.Optimizers.adam],
    losses: [this.Losses.categoricalCrossentropy],
    activations: [this.Activations.relu],
    layers: [10, 8, 9, 10, 8, 7, 10, 9, 9, 9]
  },
  humidity: {
    key: '',
    name: 'Huấn luyện Độ ẩm',
    description: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm cho cây của bạn.',
    type: this.ExperimentTargetTypes.classification,
    features: [
      ['state.humidity', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.misting', DataUtils.toNumber],
      ['state.misting', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [this.Algorithms.neuralNetwork],
    optimizers: [this.Optimizers.adam],
    losses: [this.Losses.categoricalCrossentropy],
    activations: [this.Activations.relu],
    layers: [10, 8, 9, 10, 8, 7, 10, 9, 9, 9]
  }
};
autoKey(this.ExperimentTargets);

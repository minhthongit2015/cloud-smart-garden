const {
  Algorithms, Optimizers, Losses, Activations
} = require('../utils/AIConstants');
const { autoKey } = require('../../../utils');
const DataUtils = require('./DataUtils');
const ExperimentTargetTypes = require('./ExperimentTargetTypes');


const ExperimentTargets = {
  nutrient: {
    key: '',
    name: 'Huấn luyện Dinh dưỡng',
    description: 'Tự động điều chỉnh dinh dưỡng tối ưu theo từng giai đoạn sinh trưởng của cây trồng.',
    type: ExperimentTargetTypes.regression,
    features: [
      ['createdAt', DataUtils.fromStart]
    ],
    labels: [
      ['state.nutri', DataUtils.toNumber]
    ],
    algorithms: [Algorithms.neuralNetwork],
    optimizers: [Optimizers.adam],
    losses: [Losses.absoluteDifference],
    activations: [Activations.linear],
    layers: []
  },
  light: {
    key: '',
    name: 'Huấn luyện Ánh sáng',
    description: 'Tự động cung cấp ánh sáng quang hợp cho cây của bạn nếu cần thiết.',
    type: ExperimentTargetTypes.classification,
    features: [
      ['state.light', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.led', DataUtils.toNumber],
      ['state.led', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [Algorithms.neuralNetwork],
    optimizers: [Optimizers.adam],
    losses: [Losses.categoricalCrossentropy],
    activations: [Activations.relu],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  },
  temperature: {
    key: '',
    name: 'Huấn luyện Nhiệt độ',
    description: 'Tự động phun sương hoặc bật quạt làm mát cho cây của bạn khi nhiệt độ tăng cao.',
    type: ExperimentTargetTypes.classification,
    features: [
      ['state.temperature', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.fan', DataUtils.toNumber],
      ['state.fan', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [Algorithms.neuralNetwork],
    optimizers: [Optimizers.adam],
    losses: [Losses.categoricalCrossentropy],
    activations: [Activations.relu],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  },
  humidity: {
    key: '',
    name: 'Huấn luyện Độ ẩm',
    description: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm cho cây của bạn.',
    type: ExperimentTargetTypes.classification,
    features: [
      ['state.humidity', DataUtils.toNumber],
      ['createdAt', DataUtils.minuteOfDay]
    ],
    labels: [
      ['state.misting', DataUtils.toNumber],
      ['state.misting', DataUtils.toInverse, DataUtils.toNumber]
    ],
    algorithms: [Algorithms.neuralNetwork],
    optimizers: [Optimizers.adam],
    losses: [Losses.categoricalCrossentropy],
    activations: [Activations.relu],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  }
};
autoKey(ExperimentTargets);

module.exports = ExperimentTargets;

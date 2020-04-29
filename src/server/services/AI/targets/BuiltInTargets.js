const {
  Algorithms, Optimizers, Losses, Activations
} = require('../utils/AIConstants');
const DataUtils = require('./DataUtils');
const ExperimentTargetTypes = require('./ExperimentTargetTypes');
const { generateId } = require('../../../models/mongo/test/utils');


const ExperimentTargets = {
  nutrient: {
    title: 'nutrient',
    content: 'Tự động điều chỉnh dinh dưỡng tối ưu theo từng giai đoạn sinh trưởng của cây trồng.',
    type: ExperimentTargetTypes.regression.key,
    features: [
      [DataUtils.fromStart.key]
    ],
    labels: [
      ['state.nutri']
    ],
    algorithms: [Algorithms.neuralNetwork.key],
    optimizers: [Optimizers.adam.key],
    losses: [Losses.absoluteDifference.key],
    activations: [Activations.linear.key],
    layers: []
  },
  light: {
    title: 'light',
    content: 'Tự động cung cấp ánh sáng quang hợp cho cây của bạn nếu cần thiết.',
    type: ExperimentTargetTypes.classification.key,
    features: [
      ['state.light'],
      [DataUtils.minuteOfDay.key]
    ],
    labels: [
      ['state.led']
    ],
    algorithms: [Algorithms.neuralNetwork.key],
    optimizers: [Optimizers.adam.key],
    losses: [Losses.categoricalCrossentropy.key],
    activations: [Activations.relu.key],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  },
  temperature: {
    title: 'temperature',
    content: 'Tự động phun sương hoặc bật quạt làm mát cho cây của bạn khi nhiệt độ tăng cao.',
    type: ExperimentTargetTypes.classification.key,
    features: [
      ['state.temperature'],
      [DataUtils.minuteOfDay.key]
    ],
    labels: [
      ['state.fan']
    ],
    algorithms: [Algorithms.neuralNetwork.key],
    optimizers: [Optimizers.adam.key],
    losses: [Losses.categoricalCrossentropy.key],
    activations: [Activations.relu.key],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  },
  humidity: {
    title: 'humidity',
    content: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm cho cây của bạn.',
    type: ExperimentTargetTypes.classification.key,
    features: [
      ['state.humidity'],
      [DataUtils.minuteOfDay.key]
    ],
    labels: [
      ['state.misting']
    ],
    algorithms: [Algorithms.neuralNetwork.key],
    optimizers: [Optimizers.adam.key],
    losses: [Losses.categoricalCrossentropy.key],
    activations: [Activations.relu.key],
    layers: [9, 9, 9, 9, 9, 9, 9, 9, 9]
  }
};
generateId(ExperimentTargets, 400);

module.exports = ExperimentTargets;

const {
  Algorithms, Optimizers, Losses, Activations
} = require('../utils/AIConstants');
const { autoKey } = require('../../../utils');


const ExperimentTargetTypes = {
  classification: {
    key: '',
    name: 'Phân loại (bật/tắt)',
    description: 'Dùng cho dự đoán các trường hợp bật, tắt..',
    algorithms: [Algorithms.neuralNetwork],
    optimizers: Object.values(Optimizers),
    losses: [Losses.categoricalCrossentropy],
    activations: [
      Activations.relu, Activations.relu6, Activations.softmax, Activations.tanh
    ]
  },
  regression: {
    key: '',
    name: 'Nội suy giá trị',
    description: 'Dùng cho tính toán lượng mức (VD: 1000 ppm, 5000 lux)',
    algorithms: [Algorithms.neuralNetwork],
    optimizers: Object.values(Optimizers),
    losses: [
      Losses.absoluteDifference, Losses.meanSquaredError,
      Losses.logLoss, Losses.huberLoss, Losses.hingeLoss
    ],
    activations: [Activations.linear]
  }
};
autoKey(ExperimentTargetTypes);

module.exports = ExperimentTargetTypes;

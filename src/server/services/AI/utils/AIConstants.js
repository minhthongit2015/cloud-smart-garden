const { autoKey } = require('../../../utils');


exports.Algorithms = {
  neuralNetwork: { key: '', name: 'Neural Network' },
  linearRegression: { key: '', name: 'Linear Regression' },
  polymonialRegression: { key: '', name: 'Polynomial Regression' }
};
autoKey(this.Algorithms);

exports.Optimizers = {
  adam: { key: '', name: 'Adam' },
  sgd: { key: '', name: 'SGD' }
};
autoKey(this.Optimizers);

exports.Losses = {
  categoricalCrossentropy: { key: '', name: 'Categorical Crossentropy' },
  sparseCategoricalCrossentropy: { key: '', name: 'Sparse Categorical Crossentropy' }
};
autoKey(this.Losses);

exports.Activations = {
  relu: { key: '', name: 'Relu' },
  softmax: { key: '', name: 'Softmax' }
};
autoKey(this.Activations);


exports.ExperimentTargets = {
  nutrient: {
    key: '',
    name: 'Tối ưu Dinh dưỡng',
    description: 'Tự động điều chỉnh dinh dưỡng.'
  },
  light: {
    key: '',
    name: 'Tối ưu Ánh sáng',
    description: 'Tự động bổ sung ánh sáng nhân tạo nếu cần thiết.'
  },
  temperature: {
    key: '',
    name: 'Tối ưu Nhiệt độ',
    description: 'Tự động phun sương hoặc bật quạt làm mát nếu nhiệt độ tăng cao.'
  },
  humidity: {
    key: '',
    name: 'Tối ưu Độ ẩm',
    description: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm trong vườn.'
  }
};
autoKey(this.ExperimentTargets);

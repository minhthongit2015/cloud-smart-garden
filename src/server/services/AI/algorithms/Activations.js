const { autoKey } = require('../../../utils');
const t = require('../../../utils/t');


// 'elu'|'hardSigmoid'|'linear'|'relu'|'relu6'|
// 'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh'
const Activations = {
  // Classification
  relu: { key: '', name: 'relu' },
  relu6: { key: '', name: 'relu6' },
  softmax: { key: '', name: 'softmax' },
  tanh: { key: '', name: 'tanh' },

  // Regression
  linear: { key: '', name: 'linear' }
};
autoKey(Activations);

module.exports = Activations;

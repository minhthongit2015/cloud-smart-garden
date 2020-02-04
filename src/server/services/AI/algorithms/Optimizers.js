// const tf = require('@tensorflow/tfjs-node');
const { autoKey } = require('../../../utils');
const t = require('../../../utils/t');
const Suggestions = require('./Suggestions');

// const {
//   adam,
//   adadelta,
//   adagrad,
//   adamax,
//   momentum,
//   rmsprop,
//   sgd
// } = tf.train;

const Optimizers = {
  adam: {
    key: '',
    name: 'Adam',
    description: 'adam = momentum + rmsprop',
    rating: 5,
    params: [
      {
        type: Number, name: 'learningRate', description: t('algorithms.optimizers.adam.params.learningRate'), defaultValue: 0.001, suggestion: Suggestions.learningRate
      },
      {
        type: Number, name: 'beta1', description: t('algorithms.optimizers.adam.params.beta1'), defaultValue: 0.9, suggestion: Suggestions.dontChange
      },
      {
        type: Number, name: 'beta2', description: '', defaultValue: 0.999, suggestion: Suggestions.dontChange
      },
      {
        type: Number, name: 'epsilon', description: '', defaultValue: 1e-7, suggestion: Suggestions.dontChange
      }
    ]
  },
  adadelta: {
    key: '',
    name: 'Adadelta',
    description: 'Adadelta',
    rating: 5,
    params: [
      {
        type: Number, name: 'learningRate', description: t('algorithms.optimizers.adadelta.params.learningRate'), defaultValue: 0.001, suggestion: Suggestions.learningRate
      },
      {
        type: Number, name: 'rho', description: t('algorithms.optimizers.adadelta.params.rho'), defaultValue: 0.95, suggestion: Suggestions.dontChange
      },
      {
        type: Number, name: 'epsilon', description: '', defaultValue: 1e-7, suggestion: Suggestions.dontChange
      }
    ]
  },
  sgd: {
    key: '',
    name: 'SGD',
    description: 'Cổ điển, già yếu. Là phiên bản đời đầu của Adam và một số optimizer khác.',
    rating: 2,
    params: [
      {
        type: Number, name: 'learningRate', description: t('algorithms.optimizers.sgd.params.learningRate'), defaultValue: 0.001, suggestion: Suggestions.learningRate
      }
    ]
  }
};
autoKey(Optimizers);

module.exports = Optimizers;

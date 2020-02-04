const tf = require('@tensorflow/tfjs-node');
const { autoKey } = require('../../../utils');


const {
  adam,
  adadelta,
  adagrad,
  adamax,
  momentum,
  rmsprop,
  sgd
} = tf.train;

exports.Optimizers = {
  adam: { key: '', func: adam },
  adadelta: { key: '', func: adadelta },
  adagrad: { key: '', func: adagrad },
  adamax: { key: '', func: adamax },
  momentum: { key: '', func: momentum },
  rmsprop: { key: '', func: rmsprop },
  sgd: { key: '', func: sgd }
};
autoKey(this.Optimizers);


const {
  absoluteDifference,
  computeWeightedLoss,
  cosineDistance,
  hingeLoss,
  huberLoss,
  logLoss,
  meanSquaredError,
  sigmoidCrossEntropy,
  softmaxCrossEntropy
} = tf.losses;

exports.Losses = {
  // Classification
  categoricalCrossentropy: { key: '', func: 'categoricalCrossentropy' },
  sparseCategoricalCrossentropy: { key: '', func: 'sparseCategoricalCrossentropy' },
  sigmoidCrossEntropy: { key: '', func: sigmoidCrossEntropy },
  softmaxCrossEntropy: { key: '', func: softmaxCrossEntropy },

  // Regression
  meanSquaredError: { key: '', func: meanSquaredError },
  absoluteDifference: { key: '', func: absoluteDifference },
  computeWeightedLoss: { key: '', func: computeWeightedLoss },
  cosineDistance: { key: '', func: cosineDistance },
  hingeLoss: { key: '', func: hingeLoss },
  huberLoss: { key: '', func: huberLoss },
  logLoss: { key: '', func: logLoss }
};
autoKey(this.Losses);


exports.Activations = {
  // Classification
  relu: { key: '', func: 'relu' },
  relu6: { key: '', func: 'relu6' },
  elu: { key: '', func: 'elu' },
  selu: { key: '', func: 'selu' },
  tanh: { key: '', func: 'tanh' },
  softmax: { key: '', func: 'softmax' },
  softplus: { key: '', func: 'softplus' },
  softsign: { key: '', func: 'softsign' },
  sigmoid: { key: '', func: 'sigmoid' },
  hardSigmoid: { key: '', func: 'hardSigmoid' },

  // Regression
  linear: { key: '', func: 'linear' }
};
autoKey(this.Activations);

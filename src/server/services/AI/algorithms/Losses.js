// const tf = require('@tensorflow/tfjs-node');
const { autoKey } = require('../../../utils');
const t = require('../../../utils/t');


// const {
//   absoluteDifference,
//   computeWeightedLoss,
//   cosineDistance,
//   hingeLoss,
//   huberLoss,
//   logLoss,
//   meanSquaredError,
//   sigmoidCrossEntropy,
//   softmaxCrossEntropy
// } = tf.losses;

const Losses = {
  // Classification
  sigmoidCrossEntropy: { key: '', name: 'Sigmoid Cross-Entropy' },
  softmaxCrossEntropy: { key: '', name: 'Softmax Cross-Entropy' },
  categoricalCrossentropy: { key: '', name: 'Categorical Cross-Entropy' },
  sparseCategoricalCrossentropy: { key: '', name: 'Sparse Categorical Cross-Entropy' },

  // Regression
  absoluteDifference: { key: '', name: 'Absolute Difference', description: t('algorithms.losses.absoluteDifference') },
  meanSquaredError: { key: '', name: 'Mean Squared Error', description: '' },
  computeWeightedLoss: { key: '', name: 'Compute Weighted Loss', description: '' },
  cosineDistance: { key: '', name: 'Cosine Distance', description: '' },
  hingeLoss: { key: '', name: 'Hinge Loss', description: '' },
  huberLoss: { key: '', name: 'Huber Loss', description: '' },
  logLoss: { key: '', name: 'Log Loss', description: '' }
};
autoKey(Losses);

module.exports = Losses;

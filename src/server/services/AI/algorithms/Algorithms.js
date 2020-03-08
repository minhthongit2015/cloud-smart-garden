const { autoKey } = require('../../../utils');

const Algorithms = {
  neuralNetwork: { key: '', name: 'Neural Network' },
  linearRegression: { key: '', name: 'Linear Regression' }
};

autoKey(Algorithms);

module.exports = Algorithms;

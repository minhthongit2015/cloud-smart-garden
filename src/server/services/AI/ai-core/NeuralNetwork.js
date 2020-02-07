
const tf = require('@tensorflow/tfjs-node');

module.exports = class Neural {
  static createSequentialModel({
    numFeature,
    numOutputs,
    layers = []
  }) {
    if (!layers || layers.length < 2) return null;
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [numFeature], units: layers[0], activation: 'relu' }),
        ...layers.slice(1).map(size => tf.layers.dense({ units: size, activation: 'softmax' })),
        tf.layers.dense({ units: numOutputs, activation: 'softmax' })
      ]
    });
    return model;
  }

  static buildModel({
    numFeatures,
    numOutputs,
    activation,
    layers = [],
    isClassification
  }) {
    const lastActivation = isClassification ? 'softmax' : activation;
    const inputLayer = tf.input({ shape: [numFeatures], activation });
    const lastMiddleLayer = layers
      .reduce((prevLayer, units) => {
        const nextDense = tf.layers.dense({ units, activation }).apply(prevLayer);
        return nextDense;
      }, inputLayer);
    const outputLayer = tf.layers.dense({
      units: numOutputs, activation: lastActivation
    }).apply(lastMiddleLayer);
    return tf.model({ inputs: inputLayer, outputs: outputLayer });
  }
};

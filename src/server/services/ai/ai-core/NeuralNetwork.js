
const tf = require('@tensorflow/tfjs-node');

module.exports = class Neural {
  static getSequentialModel({
    numFeature,
    numOutput,
    layers = [32, 24, 12]
  }) {
    if (!layers || layers.length < 2) return null;
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [numFeature], units: layers[0], activation: 'relu' }),
        ...layers.slice(1).map(size => tf.layers.dense({ units: size, activation: 'softmax' })),
        tf.layers.dense({ units: numOutput, activation: 'softmax' })
      ]
    });
    return model;
  }

  static getModel({
    numFeature,
    numOutput,
    layers = [32, 24, 12]
  }) {
    const inputLayer = tf.input({ shape: [numFeature] });
    const lastMiddleLayer = layers
      .reduce((prevLayer, units) => {
        const nextDense = tf.layers.dense({ units, activation: 'relu' }).apply(prevLayer);
        return nextDense;
      }, inputLayer);
    const outputLayer = tf.layers.dense({ units: numOutput, activation: 'softmax' }).apply(lastMiddleLayer);
    return tf.model({ inputs: inputLayer, outputs: outputLayer });
  }
};

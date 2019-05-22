
const tf = require('@tensorflow/tfjs-node');

module.exports = class Neural {
  constructor() { }

  static generateSequentialModel(layers = [32, 24, 12, 1]) {
    if (!layers || layers.length < 2) return null;
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [layers[0]], units: layers[1], activation: 'relu' }),
        ...layers.slice(1).map(size => tf.layers.dense({ units: size, activation: 'softmax' }))
      ]
    });
    return model;
  }

  static generateModel(layers = [32, 24, 12, 1]) {
    const input = tf.input({ shape: [layers[0]] });
    let prevLayer = input;
    layers.slice(1, -1).forEach(units => {
      const nextDense = tf.layers.dense({ units, activation: 'relu' }).apply(prevLayer);
      prevLayer = nextDense;
    });
    const outputLayer = tf.layers.dense({ units: layers[layers.length - 1], activation: 'softmax' }).apply(prevLayer);
    const model = tf.model({inputs: input, outputs: outputLayer});
    return model;
  }
};

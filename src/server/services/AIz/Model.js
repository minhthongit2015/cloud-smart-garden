const tf = require('@tensorflow/tfjs-node');

module.exports = class ModelService {
  static async save(model, path = 'file://./assets/model') {
    return model.save(path);
  }

  static async load(path = 'file://./assets/model') {
    return tf.loadModel(path);
  }
};

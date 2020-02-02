const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');


module.exports = class ModelService {
  static get modelFolder() {
    return './src/server/assets/models';
  }

  static ensureModelsFolder() {
    if (!fs.existsSync(this.modelFolder)) {
      fs.mkdirSync(this.modelFolder);
    }
  }

  static getModelPath(fileName, toFile = false) {
    return `file://${this.modelFolder}/${fileName.replace(/\.\.[/\\]/g, '')}${toFile ? '/model.json' : ''}`;
  }

  static async save(model, fileName = 'my-model') {
    if (!model) return null;
    this.ensureModelsFolder();
    return model.save(this.getModelPath(fileName));
  }

  static async load(fileName = 'my-model') {
    try {
      const model = await tf.loadLayersModel(this.getModelPath(fileName, true));
      return model;
    } catch (error) {
      return null;
    }
  }
};

const tf = require('@tensorflow/tfjs-node');
const fs = require('fs-extra');
const SocialService = require('../social/SocialService');
const { TrainedModel } = require('../../models/mongo');


module.exports = class extends SocialService {
  static getModel() {
    return TrainedModel;
  }

  static async createOrUpdate(model) {
    const savedModel = await super.createOrUpdate({ doc: model });
    this.cloneModelFromExperiment(savedModel._id, savedModel.experiment, savedModel.target);
    return savedModel;
  }

  static async syncModelFromExperiment(experiment, target) {
    const savedModel = await this.first({
      opts: {
        where: { experiment, target },
        sort: '-_id'
      }
    });
    this.cloneModelFromExperiment(savedModel._id, experiment, target);
    return savedModel;
  }

  static cloneModelFromExperiment(modelId, experiment, target) {
    const source = this.getModelPath(
      this.getModelPathForExperimentAndTarget(experiment, target)
    );
    if (fs.existsSync(source)) {
      const destination = this.getModelPath(modelId);
      fs.ensureDirSync(destination);
      fs.copySync(source, destination, { overwrite: true });
    }
  }

  static get modelFolder() {
    return './src/server/assets/models';
  }

  static ensureModelsFolder() {
    if (!fs.existsSync(this.modelFolder)) {
      fs.ensureDirSync(this.modelFolder);
    }
  }

  static getModelPath(fileName, toFile = false) {
    return `${this.modelFolder}/${fileName.replace(/\.\.[/\\]/g, '')}${toFile ? '/model.json' : ''}`;
  }

  static asLocalUrl(relativePath) {
    return `file://${relativePath}`;
  }

  static async save(model, fileName = 'my-model') {
    if (!model) return null;
    this.ensureModelsFolder();
    const url = this.asLocalUrl(this.getModelPath(fileName));
    return model.save(url);
  }

  static async load(fileName = 'my-model') {
    try {
      const url = this.asLocalUrl(this.getModelPath(fileName, true));
      const model = await tf.loadLayersModel(url);
      return model;
    } catch (error) {
      return null;
    }
  }

  static async saveForExperimentAndTarget(model, experimentId, target) {
    return this.save(model, this.getModelPathForExperimentAndTarget(experimentId, target));
  }

  static async loadForExperimentAndTarget(experimentId, target) {
    return this.load(this.getModelPathForExperimentAndTarget(experimentId, target));
  }

  static getModelPathForExperimentAndTarget(experimentId, target) {
    const targetKey = target && target.key ? `${target.key}` : (target || '');
    return `${experimentId}-${targetKey}`;
  }

  static loadByModel(modelId) {
    return this.load(modelId);
  }
};

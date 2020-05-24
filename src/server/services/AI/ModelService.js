const tf = require('@tensorflow/tfjs-node');
const fs = require('fs-extra');
const SocialService = require('../social/SocialService');
const { TrainedModel } = require('../../models/mongo');
const TrainingTaskService = require('./TrainingTaskService');


module.exports = class extends SocialService {
  static getModel() {
    return TrainedModel;
  }

  static async createOrUpdate({ doc, user }) {
    const savedModel = await super.createOrUpdate.call(this, { doc, user });
    this.cloneModelFromTemporary(savedModel._id, savedModel.experiment, savedModel.target);
    return savedModel;
  }

  static async syncModelFromTemporary(experiment, target) {
    const savedModel = await this.getLatestStoredModel(experiment, target);
    await this.cloneModelFromTemporary(savedModel._id, experiment, target);
    return savedModel;
  }

  static getLatestStoredModel(experiment, target) {
    return this.first({
      opts: {
        where: {
          experiment,
          target
        },
        sort: '-createdAt'
      }
    });
  }

  static async cloneModelFromTemporary(modelId, experiment, target) {
    const task = await TrainingTaskService.getPreviousTask({ experiment, target });
    const source = this.getModelPath(this.getTemporaryModelPath(task._id));
    if (fs.existsSync(source)) {
      const destination = this.getModelPath(this.getStoredModelPath(modelId));
      fs.ensureDirSync(destination);
      fs.copySync(source, destination, { overwrite: true });
    }
  }

  static get modelFolder() {
    return './src/server/assets/models';
  }

  static ensureModelsFolder(folder) {
    if (!fs.existsSync(folder || this.modelFolder)) {
      fs.ensureDirSync(folder || this.modelFolder);
    }
  }

  static getModelPath(fileName, toFile = false) {
    return `${this.modelFolder}/${fileName.replace(/\.\.[/\\]/g, '')}${toFile ? '/model.json' : ''}`;
  }

  static asLocalUrl(relativePath) {
    return `file://${relativePath}`;
  }

  static async saveTemporaryModel(model, taskId) {
    return this.save(model, this.getTemporaryModelPath(taskId));
  }

  static async loadTemporaryModel(taskId) {
    return this.load(this.getTemporaryModelPath(taskId));
  }

  static deleteTemporaryModel(taskId) {
    return this.delete(this.getTemporaryModelPath(taskId));
  }

  static getTemporaryModelPath(taskId) {
    return `temp/${taskId}`;
  }

  static async loadByExperimentAndTarget(experiment, target) {
    const previousTask = await TrainingTaskService.getPreviousTask({ experiment, target });
    return previousTask
      ? this.loadTemporaryModel(previousTask._id)
      : null;
  }

  static loadByModel(modelId) {
    return this.load(this.getStoredModelPath(modelId));
  }

  static getStoredModelPath(modelId) {
    return `stored/${modelId}`;
  }

  static async save(model, fileName = 'my-model') {
    if (!model) return null;
    const modelPath = this.getModelPath(fileName);
    this.ensureModelsFolder(modelPath);
    const url = this.asLocalUrl(modelPath);
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

  static async delete(fileName = 'my-model') {
    const url = this.asLocalUrl(this.getModelPath(fileName, false));
    fs.removeSync(url);
  }
};

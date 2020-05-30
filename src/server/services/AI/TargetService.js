const tf = require('@tensorflow/tfjs-node');
const SocialService = require('../social/SocialService');
const { ExperimentTarget: Target } = require('../../models/mongo');
const BuiltInTargets = require('./targets/BuiltInTargets');
const StationService = require('../garden/StationService');
const { set } = require('../../utils');
const ModelService = require('./ModelService');
const DataUtilsHelper = require('./targets/DataUtilsHelper');
const TargetHelper = require('./targets/TargetHelper');
const { InputContext, ExperimentTarget } = require('./utils/AITypes');


module.exports = class extends SocialService {
  static getModel() {
    return Target;
  }

  static async getTarget(targetOrId) {
    if (!targetOrId) return null;
    if (typeof targetOrId === 'string' && BuiltInTargets[targetOrId]) {
      return BuiltInTargets[targetOrId];
    }
    if (targetOrId.key && BuiltInTargets[targetOrId.key]) {
      return BuiltInTargets[targetOrId.key];
    }
    return this.get({ id: targetOrId });
  }

  static async predict(record, stationId) {
    const station = await StationService.get({ id: stationId });
    if (!station) return null;

    const { plants } = station;
    if (plants) {
      const { models } = plants[0].plant;
      const predicts = {};
      const context = new InputContext();
      context.startTime = 0; // station.crop.createdAt;
      await Promise.all(models.map(async (modelId) => {
        const model = await ModelService.get({ id: modelId });
        if (!model) {
          return;
        }
        const savedModel = await ModelService.loadByModel(model._id);
        const target = await this.getTarget(model.target);
        this.predictWithTarget(record, context, savedModel, target, predicts);
      }));
      return predicts;
    }

    return null;
  }

  static predictWithTarget(record, context, model, target = new ExperimentTarget(), predicts) {
    context.record = record;
    const features = TargetHelper.buildFeatures(target.features, record);
    tf.tidy(() => {
      const input = features.map(
        featurePath => DataUtilsHelper.mapThroughtAllNodes(featurePath, context)
      );
      const predict = model.predict(
        tf.tensor2d(input, [1, features.length])
      ).arraySync();
      const output = TargetHelper.getOutput(predict[0], target, record);
      set(predicts, target.labels[0][0], output);
    });
  }
};

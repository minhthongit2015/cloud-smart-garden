const tf = require('@tensorflow/tfjs-node');
const CRUDService = require('../CRUDService');
const { Target } = require('../../models/mongo');
const BuiltInTargets = require('./targets/BuiltInTargets');
const StationService = require('../garden/Station');
const { set } = require('../../utils');
const ModelService = require('./ModelServ');
const DataUtilsHelper = require('./targets/DataUtilsHelper');
const TargetHelper = require('./targets/TargetHelper');
const { InputContext, ExperimentTarget } = require('./utils/AITypes');


module.exports = class extends CRUDService {
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
    return this.get(targetOrId);
  }

  static async predict(record, stationId) {
    const station = await StationService.get(stationId);
    if (!station) return null;

    const { models } = station;
    if (models) {
      const predicts = {};
      const context = new InputContext();
      context.startTime = 0; // station.crop.createdAt;
      await Promise.all(models.map(async (model) => {
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

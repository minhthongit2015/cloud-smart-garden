const tf = require('@tensorflow/tfjs-node');
const PostService = require('../blog/PostServ');
const { Target } = require('../../models/mongo');
const BuiltInTargets = require('./targets/BuiltInTargets');
const StationService = require('../garden/Station');
const { get, set } = require('../../utils');
const ModelService = require('./ModelServ');
const DataUtilsHelper = require('./targets/DataUtilsHelper');
const { InputContext, ExperimentTarget } = require('./utils/AITypes');


module.exports = class extends PostService {
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

    const { models } = station;
    if (models) {
      const predicts = {};
      await Promise.all(models.map(async (model) => {
        const savedModel = await ModelService.loadByModel(model._id);
        const target = await this.getTarget(model.target);
        this.predictWithTarget(record, station, savedModel, target, predicts);
      }));
      return predicts;
    }

    return null;
  }

  static predictWithTarget(record, station, model, target = new ExperimentTarget(), predicts) {
    const context = new InputContext();
    context.record = record;
    context.startTime = 0; // station.crop.createdAt;
    const input = target.features.map(
      featurePath => DataUtilsHelper.mapThroughtAllNodes(featurePath, context)
    );
    tf.tidy(() => {
      const predict = model.predict(
        tf.tensor2d(input, [1, target.features.length])
      ).arraySync();
      const output = DataUtilsHelper.getOutput(predict[0], record, target);
      set(predicts, target.labels[0][0], output);
    });
  }
};

const tf = require('@tensorflow/tfjs-node');
const moment = require('moment');
const SocialService = require('../social/SocialService');
const { ExperimentTarget: Target } = require('../../models/mongo');
const BuiltInTargets = require('./targets/BuiltInTargets');
const StationService = require('../garden/StationService');
const { set } = require('../../utils');
const ModelService = require('./ModelService');
const DataUtilsHelper = require('./targets/DataUtilsHelper');
const TargetHelper = require('./targets/TargetHelper');
const { InputContext, ExperimentTarget } = require('./utils/AITypes');


function parseDuration(time = '') {
  const days = time.match(/(\d+)d/) && time.match(/(\d+)d/)[1];
  const hours = time.match(/(\d+)h/) && time.match(/(\d+)h/)[1];
  const minutes = time.match(/(\d+)m/) && time.match(/(\d+)m/)[1];
  const seconds = time.match(/(\d+)s/) && time.match(/(\d+)s/)[1];
  return moment.duration(+days, 'days')
    .add(moment.duration(+hours, 'hours'))
    .add(moment.duration(+minutes, 'minutes'))
    .add(moment.duration(+seconds, 'seconds'));
}

function runTask(task, state) {
  const taskState = {};
  const {
    beginTime, every, action, duration
  } = task;
  const now = moment();
  const begin = moment(beginTime);

  const everyDuration = parseDuration(every);
  const durationDuration = parseDuration(duration);
  const everySeconds = everyDuration.asSeconds();
  const durationSeconds = durationDuration.asSeconds();

  const diffSeconds = now.diff(begin) / 1000;
  const remainderSeconds = diffSeconds % everySeconds;
  const isInDuration = remainderSeconds < durationSeconds;

  taskState[action] = now.isAfter(beginTime) && isInDuration;

  if (!taskState[action]) {
    delete taskState[action];
  }

  return Object.assign(state, taskState);
}

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
      const { models, tasks } = plants[0].plant;
      const predicts = {};

      if ((!models || !models.length) && tasks && tasks.length > 0) {
        const state = {
          led: false,
          bump: false
        };
        tasks.reduce((prevState, taskI) => runTask(taskI, prevState), state);
        predicts.state = state;
        return predicts;
      }

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

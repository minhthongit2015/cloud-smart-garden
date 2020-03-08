// const tf = require('@tensorflow/tfjs-node');
const DataUtilsHelper = require('../targets/DataUtilsHelper');
const { Dataset, TrainingSet, InputContext } = require('../utils/AITypes');


const MapDatasetOptionsInterface = {
  features: [], // e.g: ['createdAt'] | [['createdAt', 'fromStart']]
  labels: [], // e.g: ['state.nutri']
  mappingNodes: []
};

module.exports = class {
  static fromDataset(
    dataset = new Dataset(),
    opts = { ...MapDatasetOptionsInterface }
  ) {
    if (!opts || !opts.features || !opts.labels) {
      return null;
    }
    const { features, labels } = opts;
    const trainingSet = new TrainingSet();
    trainingSet.features = features;
    trainingSet.labels = labels;
    trainingSet.xs = [];
    trainingSet.ys = [];
    const context = new InputContext();
    context.startTime = dataset.records[0].createdAt;
    dataset.records.forEach(
      (record) => {
        context.record = record;
        trainingSet.xs.push(
          features.map(featurePath => DataUtilsHelper.mapThroughtAllNodes(featurePath, context))
        );
        trainingSet.ys.push(
          labels.map(labelPath => DataUtilsHelper.mapThroughtAllNodes(labelPath, context))
        );
      }
    );

    return trainingSet;
  }
};

// const tf = require('@tensorflow/tfjs-node');
const DataUtilsHelper = require('../targets/DataUtilsHelper');
const { Dataset, TrainingSet, InputContext } = require('../utils/AITypes');
const TargetHelper = require('../targets/TargetHelper');


class MapDatasetOptionsInterface {
  // e.g: ['createdAt'] | [['createdAt', 'fromStart']]
  features = [];

  // e.g: ['state.nutri']
  labels = [];

  mappingNodes = [];
}

module.exports = class {
  static fromDataset(
    dataset = new Dataset(),
    opts = new MapDatasetOptionsInterface()
  ) {
    if (!opts || !opts.features || !opts.labels) {
      return null;
    }
    const { features, labels } = opts;
    const trainingSet = new TrainingSet();
    trainingSet.features = TargetHelper.buildFeatures(features, dataset.records[0]);
    trainingSet.labels = TargetHelper.buildLabels(labels, dataset.records[0]);
    trainingSet.xs = [];
    trainingSet.ys = [];
    const context = new InputContext();
    context.startTime = dataset.records[0].createdAt;
    dataset.records.forEach(
      (record) => {
        context.record = record;
        trainingSet.xs.push(
          trainingSet.features.map(
            featurePath => DataUtilsHelper.mapThroughtAllNodes(featurePath, context)
          )
        );
        trainingSet.ys.push(
          trainingSet.labels.map(
            labelPath => DataUtilsHelper.mapThroughtAllNodes(labelPath, context)
          )
        );
      }
    );

    return trainingSet;
  }
};

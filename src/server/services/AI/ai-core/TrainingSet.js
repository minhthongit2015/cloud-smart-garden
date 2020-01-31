// const tf = require('@tensorflow/tfjs-node');
const { get, isFunction } = require('../../../utils');
const DataUtils = require('./DataUtils');
const { DatasetInterface, TrainingSet } = require('../utils/AITypes');


const MapDatasetOptionsInterface = {
  features: [], // e.g: ['createdAt'] | [['createdAt', 'fromStart']]
  labels: [], // e.g: ['state.nutri']
  mappingNodes: [DataUtils.fromStart.id]
};

module.exports = class {
  static fromDataset(
    dataset = { ...DatasetInterface },
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
    dataset.records.forEach(
      (record) => {
        trainingSet.xs.push(
          features.map(featurePath => this.mapThroughtAllNodes(record, featurePath, dataset))
        );
        trainingSet.ys.push(
          labels.map(labelPath => this.mapThroughtAllNodes(record, labelPath, dataset))
        );
      }
    );

    return trainingSet;
  }

  static mapThroughtAllNodes(record, valuePath, dataset) {
    if (typeof valuePath === 'string') {
      return get(record, valuePath);
    }
    return valuePath.slice(1).reduce((value, node) => {
      if (isFunction(node)) return node(value);
      if (typeof node !== 'string') return value;
      return DataUtils[node].execution(dataset, value);
    }, get(record, valuePath[0]));
  }
};

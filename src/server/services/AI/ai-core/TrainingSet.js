// const tf = require('@tensorflow/tfjs-node');
const { get } = require('../../../utils');
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

  static mapThroughtAllNodes(record, inputPath, dataset) {
    if (typeof inputPath === 'string') {
      return get(record, inputPath);
    }
    return inputPath.slice(1).reduce((inputValue, node) => {
      if (typeof node === 'function') {
        return node(inputValue, record, dataset);
      }
      if (typeof node === 'object' && node.execution) {
        return DataUtils.runUtil(node, inputValue, record, dataset);
      }
      if (typeof node === 'string' && DataUtils[node]) {
        return DataUtils.runUtil(DataUtils[node], inputValue, record, dataset);
      }
      return inputValue;
    }, get(record, inputPath[0]));
  }
};

// const tf = require('@tensorflow/tfjs-node');
const { get } = require('../../../utils');
const DataUtils = require('../utils/DataUtils');
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
      (record, index) => {
        trainingSet.xs.push(
          features.map(featurePath => this.mapThroughtAllNodes(record, index, featurePath, dataset))
        );
        trainingSet.ys.push(
          labels.map(labelPath => this.mapThroughtAllNodes(record, index, labelPath, dataset))
        );
      }
    );

    return trainingSet;
  }

  static mapThroughtAllNodes(record, index, inputPath, dataset) {
    if (typeof inputPath === 'string') {
      return get(record, inputPath);
    }
    return inputPath.slice(1).reduce((inputValue, node) => {
      if (typeof node === 'function') {
        return node(inputValue, record, index, dataset);
      }
      if (typeof node === 'object' && node.key) {
        const utilNode = DataUtils[node.key];
        return DataUtils.runUtil(utilNode, inputValue, record, index, dataset);
      }
      if (typeof node === 'string' && DataUtils[node]) {
        return DataUtils.runUtil(DataUtils[node], inputValue, record, index, dataset);
      }
      return inputValue;
    }, get(record, inputPath[0]));
  }
};

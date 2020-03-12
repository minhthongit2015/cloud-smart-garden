const { get } = require('../../../utils');
const DataUtils = require('./DataUtils');
const { ExperimentTarget } = require('../utils/AITypes');


module.exports = class {
  static getOutput(predict, target, record) {
    const sample = get(record, target.labels[0][0]);
    if (typeof sample === 'boolean') {
      return predict[0] > predict[1];
    }
    return predict[0];
  }

  /**
   * Auto add `DataUtils.toNumber` to after boolean feature
   */
  static buildFeatures(features, record) {
    return features.map((feature) => {
      const sample = get(record, feature[0]);
      if (typeof sample === 'boolean') {
        return [feature[0], DataUtils.toNumber, ...feature.slice(1)];
      }
      return feature;
    });
  }

  /**
   * Auto duplicate boolean feature and convert to [0,1] to support `Categorical Cross-Entropy`
   */
  static buildLabels(labels, record) {
    const firstLabel = labels[0];
    const sample = get(record, firstLabel[0]);
    if (typeof sample === 'boolean') {
      return [
        [firstLabel[0], DataUtils.toNumber],
        [firstLabel[0], DataUtils.toInverse, DataUtils.toNumber]
      ];
    }
    return labels;
  }
};

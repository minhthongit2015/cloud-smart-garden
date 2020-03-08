const DataUtils = require('./DataUtils');
const { get, valueOf } = require('../../../utils');
const { InputContext, DataUtilNode } = require('../utils/AITypes');


module.exports = class {
  static mapThroughtAllNodes(inputPath, inputContext = new InputContext()) {
    if (typeof inputPath === 'string') {
      return get(inputContext.record, inputPath);
    }
    return inputPath.slice(1).reduce((inputValue, node) => {
      if (typeof node === 'function') {
        return node(inputValue, inputContext);
      }
      let utilNode;
      if (typeof node === 'object' && node.key) {
        utilNode = DataUtils[node.key];
      }
      if (typeof node === 'string' && DataUtils[node]) {
        utilNode = DataUtils[node];
      }
      return utilNode
        ? this.runUtil(utilNode, inputValue, inputContext)
        : inputValue;
    }, get(inputContext.record, inputPath[0]));
  }

  static runUtil(utilNode = new DataUtilNode(), inputValue, context = new InputContext()) {
    const params = utilNode.params
      ? utilNode.params.map(param => this.getParamValue(param, context))
      : [];
    const result = utilNode.execute(
      valueOf(inputValue, utilNode.inputType), context, ...params
    );
    return valueOf(result, utilNode.outputType);
  }

  static getParamValue(param, context) {
    if (!param) return null;
    let paramValue = param.defaultValue;
    if (param.from) {
      paramValue = get(context, param.from);
    }
    return valueOf(paramValue, param.type);
  }

  static getOutput(predict, record, target) {
    const labelSample = get(record, target.labels[0][0]);
    if (typeof labelSample === 'boolean') {
      return predict[0] > predict[1];
    }
    return predict[0];
  }
};

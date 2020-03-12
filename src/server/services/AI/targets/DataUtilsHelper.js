const DataUtils = require('./DataUtils');
const { get, valueOf } = require('../../../utils');
const { InputContext, DataUtilNode } = require('../utils/AITypes');


module.exports = class {
  static mapThroughtAllNodes(nodesOrProp, inputContext = new InputContext()) {
    if (typeof nodesOrProp === 'string') {
      return get(inputContext.record, nodesOrProp);
    }
    return nodesOrProp.reduce(
      (inputValue, node) => this.runNode(inputValue, node, inputContext),
      null
    );
  }

  static runNode(inputValue, node, inputContext = new InputContext()) {
    if (inputValue == null && typeof node === 'string' && get(inputContext.record, node)) {
      return get(inputContext.record, node);
    }
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
  }

  static runUtil(utilNode = new DataUtilNode(), inputValue, context = new InputContext()) {
    const params = utilNode.params
      ? utilNode.params.map(param => this.getParamValue(param, context))
      : [];
    if (inputValue == null && utilNode.defaultInput && utilNode.defaultInput.from) {
      inputValue = get(context, utilNode.defaultInput.from);
    }
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
};

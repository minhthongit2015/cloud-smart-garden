/* eslint-disable new-cap */
/* eslint-disable no-new */

export const mapTreeNodeToArray = (() => {
  function isComponentNode(node) {
    return typeof node.type === 'function';
  }
  function getTrueNode(node) {
    node = new node.type(node.props);
    return node.render ? node.render() : node;
  }
  function isNode(node) {
    return node && typeof node === 'object' && node.props;
  }
  function isArrayOfNodes(node) {
    return node && typeof node === 'object' && node.length;
  }
  function isNodeOrArrayOfNodes(node) {
    return isNode(node) || isArrayOfNodes(node);
  }
  function getChildren(node) {
    try {
      let children = isArrayOfNodes(node) ? node : node.props.children;
      children = isArrayOfNodes(children) ? children : [children];
      return children.filter(child => isNode(child));
    } catch (error) {
      return [];
    }
  }
  return function _mapTreeNodeToArray(root, array, childIndex, parentPath) {
    if (!array || !isNodeOrArrayOfNodes(root)) return null;
    let currentPath;
    if (isComponentNode(root)) {
      root = getTrueNode(root);
    }
    if (isArrayOfNodes(root)) {
      currentPath = parentPath;
    } else {
      currentPath = `${parentPath || ''} > ${root.type}:nth-child(${(childIndex || 0) + 1})`;
    }
    if (isNode(root)) {
      array.push({
        selector: currentPath,
        props: Object.entries(root.props)
          .filter(([key]) => key !== 'children')
      });
    }
    const children = getChildren(root);
    return children.forEach((child, index) => {
      _mapTreeNodeToArray(child, array, index, currentPath);
    });
  };
})();

export default {
  mapTreeNodeToArray
};

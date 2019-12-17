
export const mapTreeNodeToArray = (() => {
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
    let children = isArrayOfNodes(node) ? node : node.props.children;
    children = isArrayOfNodes(children) ? children : [children];
    return children.filter(child => isNode(child));
  }
  return function _mapTreeNodeToArray(root, array, childIndex, parentPath) {
    if (!array || !isNodeOrArrayOfNodes(root)) return null;
    let currentPath;
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



// eslint-disable-next-line class-methods-use-this
export function mapTreeNodeToArray(root, array, childIndex, parentPath) {
  if (!root || !array || typeof root !== 'object') return null;
  const currentPath = `${parentPath ? `${parentPath} > ${root.type}` : `> ${root.type}`}`
      + `:nth-child(${(childIndex || 0) + 1})`;
  array.push({
    selector: currentPath,
    props: Object.entries(root.props)
      .filter(([key]) => key !== 'children')
  });
  if (!root.props.children || typeof root.props.children !== 'object') return null;
  return root.props.children.forEach((child, index) => {
    mapTreeNodeToArray(child, array, index, currentPath);
  });
}

export default {
  mapTreeNodeToArray
};

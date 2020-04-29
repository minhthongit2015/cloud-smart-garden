function generateId(arrayOrMap, start = 100) {
  if (!arrayOrMap) {
    return;
  }
  const array = Array.isArray(arrayOrMap)
    ? arrayOrMap
    : Object.values(arrayOrMap);
  array.forEach((element, index) => {
    element._id = (start + index).toString().padStart(24, '0');
  });
}

function mapParent(treeMap) {
  Object.entries(treeMap).forEach(([key, item], index, entries) => {
    item.type = key;
    if (item.parent) {
      const foundParent = entries.find(([parentKey, parent]) => {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item._id);
        return parentKey === item.parent;
      });
      if (foundParent) {
        item.parent = foundParent._id;
      }
    }
  });
}

module.exports = {
  generateId,
  mapParent
};

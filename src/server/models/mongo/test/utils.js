const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

function generateId(array, start = 100) {
  array.forEach((element, index) => {
    element.id = new ObjectId((start + index).toString().padStart(24, '0'));
  });
}

function mapParent(treeMap) {
  Object.entries(treeMap).forEach(([key, item], index, entries) => {
    item.type = key;
    if (item.parent) {
      item.parent = entries.find(([parentKey, parent]) => {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item.id);
        return parentKey === item.parent;
      }).id;
    }
  });
}

module.exports = {
  generateId,
  mapParent
};

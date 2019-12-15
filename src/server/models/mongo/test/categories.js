const { generateId, mapParent } = require('./utils');

const categories = {
  Adventure: { name: 'Adventure' },

  Feature: { name: 'Feature' },
  TechFeature: { name: 'TechFeature', parent: 'Feature' }, // Công nghệ mới
  PlantFeature: { name: 'PlantFeature', parent: 'Feature' }, // Loài cây mới

  Knowledge: { name: 'Knowledge' }, // Chia sẻ kiến thức

  Intranet: { name: 'Intranet' } // Tin tức/Thông báo nội bộ
};

generateId(Object.values(categories), 200);
mapParent(categories);

module.exports = Object.values(categories);

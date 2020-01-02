const { generateId, mapParent } = require('./utils');
const RouteConstants = require('../../../../client/app/utils/RouteConstants');

const categoriesMap = {
  // Chuyên mục ẩn - Dùng làm đánh giá / đường dẫn
  AI: { name: 'AI', path: RouteConstants.aiCloudLink },
  Project: { name: 'Project', parent: 'AI', path: RouteConstants.aiProjectsLink },
  Experiment: { name: 'Experiment', parent: 'AI', path: RouteConstants.aiExperimentsLink },

  Garden: { name: 'Garden', path: RouteConstants.myGardenLink },
  Station: { name: 'Station', path: RouteConstants.myGardenLink },

  // Các trang về trao đổi nguyện vọng với người dùng
  NextFeatures: { name: 'Bạn muốn điều gì?', path: RouteConstants.nextFeaturesLink },
  NextTech: { name: 'Công nghệ yêu thích', parent: 'NextFeatures', path: RouteConstants.nextTechLink }, // Công nghệ mới
  NextSpecies: { name: 'Loài cây yêu thích', parent: 'NextFeatures', path: RouteConstants.nextSpeciesLink }, // Loài cây mới

  // Các trang về cuộc phiêu lưu phát triển vương quốc loài cây
  Adventure: { name: 'Adventure' },

  // Các trang về chia sẻ kiến thức chuyên ngành
  Knowledge: { name: 'Knowledge' }, // Chia sẻ kiến thức

  // Các trang về thông tin nội bộ
  Intranet: { name: 'Intranet', path: RouteConstants.intranetLink } // Tin tức/Thông báo nội bộ
};

generateId(Object.values(categoriesMap), 200);
Object.entries(categoriesMap).forEach(([key, category]) => {
  category.type = key;
});
mapParent(categoriesMap);

module.exports = categoriesMap;

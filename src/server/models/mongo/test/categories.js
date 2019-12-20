const { generateId, mapParent } = require('./utils');

const categories = {
  // Các trang về cuộc phiêu lưu phát triển vương quốc loài cây
  Adventure: { name: 'Adventure' },

  // Các trang về trao đổi nguyện vọng với người dùng
  NextFeatures: { name: 'Bạn muốn điều gì?' },
  NextTech: { name: 'Công nghệ yêu thích', parent: 'NextFeatures' }, // Công nghệ mới
  NextSpecies: { name: 'Loài cây yêu thích', parent: 'NextFeatures' }, // Loài cây mới

  // Các trang về chia sẻ kiến thức chuyên ngành
  Knowledge: { name: 'Knowledge' }, // Chia sẻ kiến thức

  // Các trang về thông tin nội bộ
  Intranet: { name: 'Intranet' } // Tin tức/Thông báo nội bộ
};

generateId(Object.values(categories), 200);
mapParent(categories);

module.exports = Object.values(categories);

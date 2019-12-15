

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./_Post');

/**
 * Yêu cầu các tính năng / Tính năng sắp thực hiện
 */
const Schema = new mongoose.Schema({
  type: String,
  isUpcoming: Boolean,
  cost: Number, // Kinh phí cần thiết để thực hiện
  fund: Number // Kinh phí đã được cộng đồng / Tự nhóm góp được
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Feature', field: 'order' });
const Model = Post.discriminator('Feature', Schema);

module.exports = Model;



const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./_Post');

/**
 * Các bài viết chia sẻ kiến thức
 */
const Schema = new mongoose.Schema({
  //
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Knowledge', field: 'order' });
const Model = Post.discriminator('Knowledge', Schema);

module.exports = Model;

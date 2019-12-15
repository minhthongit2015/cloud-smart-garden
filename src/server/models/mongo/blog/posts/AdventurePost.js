

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('./_Post');

/**
 * Các bài viết về hành trình xây dựng **`Beyond Garden`**
 */
const Schema = new mongoose.Schema({
  //
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Adventure', field: 'order' });
const Model = Post.discriminator('Adventure', Schema);

module.exports = Model;

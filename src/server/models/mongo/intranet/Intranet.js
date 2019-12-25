

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('../blog-base/Post');

/**
 * Các tin tức/thông báo nội bộ - Và nếu mọi người muốn biết bên trong chúng ta làm việc như thế nào
 */
const Schema = new mongoose.Schema({
  //
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Intranet', field: 'order' });
const Model = Post.discriminator('Intranet', Schema);

module.exports = Model;

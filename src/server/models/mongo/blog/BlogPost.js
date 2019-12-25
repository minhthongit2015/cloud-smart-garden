

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('../blog-base/Post');

const Schema = new mongoose.Schema({
  //
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'BlogPost', field: 'order' });
const Model = Post.discriminator('BlogPost', Schema);

module.exports = Model;

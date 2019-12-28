const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  garden: { type: ObjectId, ref: 'Garden' },
  model: String,
  state: Object
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Station', field: 'order' });
const Model = Post.discriminator('Station', Schema);

module.exports = Model;

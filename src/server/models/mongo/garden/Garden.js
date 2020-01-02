const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  model: String,
  state: Object, // latest state
  stations: [{ type: ObjectId, ref: 'Station' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Garden', field: 'order' });
const Model = Post.discriminator('Garden', Schema);

module.exports = Model;

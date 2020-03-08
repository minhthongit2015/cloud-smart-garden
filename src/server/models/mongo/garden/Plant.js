const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Post = require('../blog-base/Post');

// const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Plant', field: 'order' });
const Model = Post.discriminator('Plant', Schema);

module.exports = Model;

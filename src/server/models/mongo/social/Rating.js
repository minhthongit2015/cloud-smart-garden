
const mongoose = require('mongoose');
const Post = require('./Post');
const { ModelName } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  user: { type: ObjectId, ref: ModelName.user },
  post: { type: ObjectId, ref: ModelName.post },
  rating: { type: Number, default: 0 }
});

Schema.post('save', async (doc) => {
  const post = await Post.findById(doc.post);
  post.totalRating = (post.totalRating || 0) + doc.rating;
  post.totalVotes = (post.totalVotes || 0) + 1;
  post.save();
}, { query: true, document: true });

const Model = mongoose.model(ModelName.rating, Schema);
module.exports = Model;

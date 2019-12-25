
const mongoose = require('mongoose');
const Post = require('./Post');

const { ObjectId } = mongoose.Schema.Types;

const RatingSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  rating: {
    type: Number,
    default: 0
  }
});

RatingSchema.post('save', async (doc) => {
  const post = await Post.findById(doc.post);
  post.totalRating = (post.totalRating || 0) + doc.rating;
  post.totalVotes = (post.totalVotes || 0) + 1;
  post.save();
}, { query: true, document: true });

const RatingModel = mongoose.model('Rating', RatingSchema);
module.exports = RatingModel;

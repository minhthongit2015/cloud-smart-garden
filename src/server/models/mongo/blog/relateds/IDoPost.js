
const mongoose = require('mongoose');
const Post = require('../posts/_Post');

const { ObjectId } = mongoose.Schema.Types;

const IDoPostSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let IDoPostModel;

async function increaseTotalIDo(iDoPost) {
  const post = await Post.findById(iDoPost.post);
  post.totalIDo = (post.totalIDo || 0) + 1;
  post.save();
}

async function decreaseTotalIDo(savedPost) {
  const post = await Post.findById(savedPost.post);
  post.totalIDo = Math.max((post.totalIDo || 0) - 1, 0);
  post.save();
}

IDoPostSchema.post('create', async (iDoPost) => {
  increaseTotalIDo(iDoPost);
}, { query: true, document: true });

IDoPostSchema.post('updateOne', async (updateResult) => {
  if (updateResult.result.n > 0) {
    const iDoPost = await IDoPostModel.findById(updateResult.upsertedId);
    increaseTotalIDo(iDoPost);
  }
}, { query: true, document: true });

IDoPostSchema.post('delete', async (iDoPost) => {
  decreaseTotalIDo(iDoPost);
}, { query: true, document: true });

IDoPostSchema.post('findOneAndDelete', async (iDoPost) => {
  decreaseTotalIDo(iDoPost);
}, { query: true, document: true });


IDoPostModel = mongoose.model('IDoPost', IDoPostSchema);
module.exports = IDoPostModel;

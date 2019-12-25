
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const { PostStatus } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  preview: String,
  video: String,
  status: {
    type: String,
    enum: Object.values(PostStatus)
  },
  parent: { type: ObjectId, ref: 'Folder' },
  owner: [{ type: ObjectId, ref: 'User' }], // Belong to a Person
  team: [{ type: ObjectId, ref: 'Team' }], // Belong to a Team
  totalRating: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  totalSaved: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

async function deleteRelatedDocs(post) {
  // eslint-disable-next-line global-require
  const Rating = require('../blog/relateds/Rating');
  await Rating.deleteMany({ post: post._id });

  // eslint-disable-next-line global-require
  const SavedPost = require('../blog/relateds/SavedPost');
  await SavedPost.deleteMany({ post: post._id });
}

Schema.post('delete', async (posts) => {
  deleteRelatedDocs(posts);
});

Schema.post('remove', async (post) => {
  deleteRelatedDocs(post);
});

Schema.post('findOneAndDelete', async (post) => {
  deleteRelatedDocs(post);
});

Schema.post('findByIdAndDelete', async (post) => {
  deleteRelatedDocs(post);
});


Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'BaseAIEntity', field: 'baseOrder' });
const Model = mongoose.model('BaseAIEntity', Schema);

module.exports = Model;

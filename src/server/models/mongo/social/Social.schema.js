/* eslint-disable max-len */

const mongoose = require('mongoose');
const { PostStatus, ModelName } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

module.exports = {
  title: String,
  summary: String,
  content: String, // description
  avatar: String,
  previewPhoto: String,
  previewVideo: String,
  previewAudio: String,
  photos: [String],
  videos: [String],
  audios: [String],
  link: String, // Main reference to entity details
  socials: Object, // { facebook: '', youtube: '', nonolive: '', instagram: '' }
  status: { type: String, enum: Object.values(PostStatus), default: PostStatus.published },
  createdBy: { type: ObjectId, ref: ModelName.user }, // The first one who created this entity
  owners: [{ type: ObjectId, ref: ModelName.user }], // Those whose own this entity (can delete...)
  managers: [{ type: ObjectId, ref: ModelName.user }], // Those who can modify this entity (but cannot delete it)
  authors: [{ type: ObjectId, ref: ModelName.user }], // Those who participated to create this entity
  teams: [{ type: ObjectId, ref: ModelName.team }], // Belong to multi Team
  categories: [{ type: ObjectId, ref: ModelName.category }],
  totalViews: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  totalSaved: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
};

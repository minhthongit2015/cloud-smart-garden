
const mongoose = require('mongoose');
const { PostStatus, ModelName } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

module.exports = {
  categories: [{ type: ObjectId, ref: ModelName.category }],
  title: String,
  content: String,
  summary: String,
  preview: String,
  video: String,
  audio: String,
  status: { type: String, enum: Object.values(PostStatus) },
  owners: [{ type: ObjectId, ref: ModelName.user }], // Belong to one Person
  authors: [{ type: ObjectId, ref: ModelName.user }], // Written by many people
  teams: [{ type: ObjectId, ref: ModelName.team }], // Belong to multi Team
  totalViews: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  totalSaved: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

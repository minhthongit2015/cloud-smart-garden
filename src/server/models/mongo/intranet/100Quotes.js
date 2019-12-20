
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  quote: String,
  author: String,
  sharedBy: String,
  owner: { type: ObjectId, ref: 'User' },
  tags: String, // teamwork, resolve problem, communicate...
  preview: String,
  video: String,
  audio: String,
  status: String, // draft, pending, approved, scheduled, published, archived
  totalRating: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  totalSaved: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: '100Quotes', field: 'order' });
const Model = mongoose.model('100Quotes', Schema);

module.exports = Model;

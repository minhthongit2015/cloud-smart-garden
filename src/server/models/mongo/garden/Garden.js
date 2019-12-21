const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  name: String,
  model: String,
  state: Object, // latest state
  stations: [{ type: ObjectId, ref: 'Station' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Model = mongoose.model('Garden', Schema);

module.exports = Model;

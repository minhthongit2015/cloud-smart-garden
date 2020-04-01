const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  plant: { type: ObjectId, ref: 'Plant' },
  createdAt: { type: Date, default: Date.now }
});
const Model = mongoose.model('UserPlant', Schema);

module.exports = Model;

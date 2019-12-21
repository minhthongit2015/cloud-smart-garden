const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  gardenId: { type: ObjectId, ref: 'Garden' },
  stationId: { type: ObjectId, ref: 'Station' },
  state: Object,
  createdAt: { type: Date, default: Date.now }
});
const Model = mongoose.model('Record', Schema);

module.exports = Model;

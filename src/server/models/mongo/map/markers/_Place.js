const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const { MarkerTypes } = require('../../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

// Food, Tool, Farm, Garden
const Schema = new mongoose.Schema({
  createdBy: { type: ObjectId, ref: 'User' },
  owners: [{ role: String, user: { type: ObjectId, ref: 'User' } }],
  name: String,
  picture: String, // Avatar
  cover: String,
  video: String,
  gallery: [String],
  description: String,
  address: String,
  link: String,
  socials: Object,
  goods: [{
    name: String, picture: String, like: Number, rating: Number
  }],
  position: { lat: Number, lng: Number },
  zoom: Number,
  path: [{ lat: Number, lng: Number }], // Render Polyline
  radius: Number, // Render Circle
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.place, field: 'baseOrder' });

const Model = mongoose.model(MarkerTypes.place, Schema);
module.exports = Model;

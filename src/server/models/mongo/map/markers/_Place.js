const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { ObjectId } = mongoose.Schema.Types;

// Food, Tool, Farm, Garden
const Schema = new mongoose.Schema({
  createdBy: { type: ObjectId, ref: 'User' },
  owners: [{ role: String, user: { type: ObjectId, ref: 'User' } }],
  name: String,
  picture: String,
  cover: String,
  images: [String],
  description: String,
  address: String,
  link: String,
  position: { lat: Number, lng: Number },
  zoom: Number,
  path: [{ lat: Number, lng: Number }], // Render Polyline
  radius: Number, // Render Circle
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Place', field: 'baseOrder' });

const Model = mongoose.model('Place', Schema);
module.exports = Model;

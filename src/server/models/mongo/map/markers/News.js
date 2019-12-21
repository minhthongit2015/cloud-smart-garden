const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  post: { type: ObjectId, ref: 'Post' }
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'NewsMarker', field: 'order' });
const Model = Place.discriminator('NewsMarker', Schema);

module.exports = Model;

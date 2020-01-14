const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes } = require('../../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  post: { type: ObjectId, ref: 'Post' }
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.event, field: 'order' });
const Model = Place.discriminator(MarkerTypes.event, Schema);

module.exports = Model;

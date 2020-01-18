const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes } = require('../../../../utils/Constants');

const Schema = new mongoose.Schema({
  promotions: Array
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.toolStore, field: 'order' });
const Model = Place.discriminator(MarkerTypes.toolStore, Schema);

module.exports = Model;

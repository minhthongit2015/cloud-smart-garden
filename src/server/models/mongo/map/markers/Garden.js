const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes } = require('../../../../utils/Constants');

const Schema = new mongoose.Schema({
  local_ip: String,
  socials: Object,
  goods: [{ type: Object }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.garden, field: 'order' });
const Model = Place.discriminator(MarkerTypes.garden, Schema);

module.exports = Model;

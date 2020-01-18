const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes } = require('../../../../utils/Constants');

const Schema = new mongoose.Schema({
  local_ip: String
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.farm, field: 'order' });
const Model = Place.discriminator(MarkerTypes.farm, Schema);

module.exports = Model;

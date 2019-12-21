const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');

const Schema = new mongoose.Schema({
  local_ip: String,
  socials: Object,
  goods: [{ type: Object }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'FarmMarker', field: 'order' });
const Model = Place.discriminator('FarmMarker', Schema);

module.exports = Model;

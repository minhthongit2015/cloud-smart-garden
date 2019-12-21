const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');

const Schema = new mongoose.Schema({
  socials: Object,
  goods: [{ type: Object }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'FoodShopMarker', field: 'order' });
const Model = Place.discriminator('FoodShopMarker', Schema);

module.exports = Model;

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes } = require('../../../../utils/Constants');

const Schema = new mongoose.Schema({
  menu: Array
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.charityRestaurant, field: 'order' });
const Model = Place.discriminator(MarkerTypes.charityRestaurant, Schema);

module.exports = Model;

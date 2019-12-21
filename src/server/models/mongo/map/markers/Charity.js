const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');

const Schema = new mongoose.Schema({
  socials: Object
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'CharityMarker', field: 'order' });
const Model = Place.discriminator('CharityMarker', Schema);

module.exports = Model;

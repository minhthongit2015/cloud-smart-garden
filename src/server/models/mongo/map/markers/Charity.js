const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');

const Schema = new mongoose.Schema({
  socials: Object
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Charity', field: 'order' });
const Model = Place.discriminator('Charity', Schema);

module.exports = Model;

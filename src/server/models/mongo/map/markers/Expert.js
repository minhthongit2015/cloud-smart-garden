const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Place = require('./_Place');
const { MarkerTypes, ContactTypes } = require('../../../../utils/Constants');

const Schema = new mongoose.Schema({
  socials: Object,
  contact: [{
    type: { type: String, enum: Object.values(ContactTypes) },
    value: String
  }],
  knowledgeableDomains: [{ type: Object }],
  plantSpecies: [{ type: String }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: MarkerTypes.expert, field: 'order' });
const Model = Place.discriminator(MarkerTypes.expert, Schema);

module.exports = Model;

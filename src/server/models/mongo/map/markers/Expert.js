// const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes, ContactTypes } = require('../../ModelConstants');


const Schema = {
  contact: [{
    type: { type: String, enum: Object.values(ContactTypes) },
    value: String
  }],
  knowledgeableDomains: [{ type: Object }],
  plantSpecies: [{ type: String }]
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.expert, Schema);

module.exports = Model;

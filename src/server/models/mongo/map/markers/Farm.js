const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes } = require('../../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  local_ip: String,
  parent: { type: ObjectId, ref: MarkerTypes.farm }
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.farm, Schema);

module.exports = Model;

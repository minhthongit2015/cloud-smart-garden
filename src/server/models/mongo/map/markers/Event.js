const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes, ModelName } = require('../../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  post: { type: ObjectId, ref: ModelName.post }
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.event, Schema);

module.exports = Model;

const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  model: String, // Hardware model
  stations: [{ type: ObjectId, ref: ModelName.station }]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.garden, Schema);

module.exports = Model;

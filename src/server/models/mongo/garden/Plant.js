const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  models: [{ type: ObjectId, ref: ModelName.trainedModel }],
  tasks: Object,
  climate: String
};

const [Model] = ModelHelper.createOrderedModel(ModelName.plant, Schema);

module.exports = Model;

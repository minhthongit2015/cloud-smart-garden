const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  experiments: [{ type: ObjectId, ref: ModelName.experiment }]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.project, Schema);

module.exports = Model;

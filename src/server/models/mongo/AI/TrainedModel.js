const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  experiment: { type: ObjectId, ref: ModelName.experiment },
  target: { type: ObjectId, ref: ModelName.experimentTarget }
};

const [Model] = ModelHelper.createOrderedModel(ModelName.trainedModel, Schema);

module.exports = Model;

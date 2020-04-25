const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');
const { ExperimentTargetTypes } = require('../../../utils/Constants');
const {
  Algorithms, Optimizers, Losses, Activations
} = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,

  // key: String,
  name: String,
  description: String,
  dataset: { type: ObjectId, ref: ModelName.dataset },
  type: { type: String, enum: Object.keys(ExperimentTargetTypes) },
  features: [[String]],
  labels: [[String]],
  algorithms: { type: String, enum: Object.keys(Algorithms) },
  optimizers: { type: String, enum: Object.keys(Optimizers) },
  losses: { type: String, enum: Object.keys(Losses) },
  activations: { type: String, enum: Object.keys(Activations) },
  layers: [Number]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.experimentTarget, Schema);

module.exports = Model;

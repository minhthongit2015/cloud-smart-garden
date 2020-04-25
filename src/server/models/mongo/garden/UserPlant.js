const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  plant: { type: ObjectId, ref: ModelName.plant },
  startDate: { type: Number, default: Date.now }
};

const [Model] = ModelHelper.createOrderedModel(ModelName.userPlant, Schema);

module.exports = Model;

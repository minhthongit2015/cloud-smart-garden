const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  garden: { type: ObjectId, ref: ModelName.garden },
  plants: [{ type: ObjectId, ref: ModelName.userPlant }],
  models: [{ type: ObjectId, ref: ModelName.trainedModel }]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.station, Schema);

module.exports = Model;

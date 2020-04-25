const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  project: [{ type: ObjectId, ref: ModelName.project }],
  datasets: [{ type: ObjectId, ref: ModelName.dataset }],
  trainedModels: [{ type: ObjectId, ref: ModelName.trainedModel }],
  configuration: {
    optimizer: String, // adam, sgd...
    activateFunc: String, // sigmoid...
    lossFunc: String, // Average square...
    layers: Array
  }
};

const [Model] = ModelHelper.createOrderedModel(ModelName.experiment, Schema);

module.exports = Model;

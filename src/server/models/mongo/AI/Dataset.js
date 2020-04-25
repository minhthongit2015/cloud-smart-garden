const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  records: [{ type: ObjectId, ref: ModelName.record }]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.dataset, Schema);

module.exports = Model;

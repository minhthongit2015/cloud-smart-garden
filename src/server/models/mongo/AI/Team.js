const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  projects: [{ type: ObjectId, ref: ModelName.project }],
  members: [{ type: ObjectId, ref: ModelName.user }]
};

const [Model] = ModelHelper.createOrderedModel(ModelName.team, Schema);

module.exports = Model;

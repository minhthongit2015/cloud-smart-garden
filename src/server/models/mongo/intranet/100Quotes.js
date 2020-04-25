// const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');

// const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,
  quote: String,
  author: String,
  sharedBy: String,
  tags: String // teamwork, resolve problem, communicate...
};

const [Model] = ModelHelper.createOrderedModel(ModelName.oneHundredQuotes, Schema);

module.exports = Model;

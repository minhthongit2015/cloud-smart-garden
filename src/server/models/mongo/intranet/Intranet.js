// const mongoose = require('mongoose');
const SocialSchema = require('../social/Social.schema');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');


const Schema = {
  ...SocialSchema
};

const [Model] = ModelHelper.createOrderedModel(ModelName.intranet, Schema);

module.exports = Model;

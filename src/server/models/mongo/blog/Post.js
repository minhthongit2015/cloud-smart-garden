
const PostSchema = require('./Post.schema');
const { ModelName } = require('../ModelConstants');
const ModelHelper = require('../ModelHelper');


// eslint-disable-next-line no-unused-vars
const [Model, Schema] = ModelHelper.createOrderedModel(ModelName.post, PostSchema);


module.exports = Model;

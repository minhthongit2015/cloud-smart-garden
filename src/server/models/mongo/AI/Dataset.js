const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  // project: [{ type: ObjectId, ref: 'Project' }]
  records: [{ type: ObjectId, ref: 'Record' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Dataset', field: 'order' });

const Model = Base.discriminator('Dataset', Schema);

module.exports = Model;



const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  experiments: [{ type: ObjectId, ref: 'Experiment' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Project', field: 'order' });
const Model = Base.discriminator('Project', Schema);

module.exports = Model;

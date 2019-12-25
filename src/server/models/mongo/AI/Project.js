

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('./_BaseAIEntity');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  categories: [{ type: ObjectId, ref: 'Category' }],
  experiments: [{ type: ObjectId, ref: 'Experiment' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Project', field: 'order' });
const Model = Base.discriminator('Project', Schema);

module.exports = Model;

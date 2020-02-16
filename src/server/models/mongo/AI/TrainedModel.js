const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  experiment: { type: ObjectId, ref: 'Experiment' },
  target: String
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'TrainedModel', field: 'order' });
const Model = Base.discriminator('TrainedModel', Schema);

module.exports = Model;

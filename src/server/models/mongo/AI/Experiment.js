const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  project: [{ type: ObjectId, ref: 'Project' }],
  datasets: [{ type: ObjectId, ref: 'Dataset' }],
  trainedModels: [{ type: ObjectId, ref: 'TrainedModel' }],
  configuration: {
    optimizer: String, // adam, sgd...
    activateFunc: String, // sigmoid...
    lossFunc: String, // Average square...
    layers: Array
  }
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Experiment', field: 'order' });
const Model = Base.discriminator('Experiment', Schema);

module.exports = Model;

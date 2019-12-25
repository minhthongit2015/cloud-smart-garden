const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('./_BaseAIEntity');

// const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  // project: [{ type: ObjectId, ref: 'Project' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Dataset', field: 'order' });
const Model = Base.discriminator('Dataset', Schema);

module.exports = Model;

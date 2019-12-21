
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ExperimentSchema = new mongoose.Schema({
  name: String,
  configs: Object,
  owner: ObjectId, // Belong to a Person
  team: ObjectId, // Belong to a Team
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const ExperimentModel = mongoose.model('experiments', ExperimentSchema);

module.exports = ExperimentModel;


const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ExperimentSchema = new mongoose.Schema({
  name: String,
  configs: Object,
  owner: ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});
const ExperimentModel = mongoose.model('experiments', ExperimentSchema);

module.exports = ExperimentModel;

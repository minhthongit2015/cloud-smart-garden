const mongoose = require('mongoose');
const { ExperimentTargetTypes } = require('../../../utils/Constants');
const {
  Algorithms, Optimizers, Losses, Activations
} = require('../../../utils/Constants');

// const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  // key: String,
  name: String,
  description: String,
  type: {
    type: String,
    enum: [...Object.keys(ExperimentTargetTypes)]
  },
  features: [[String]],
  labels: [[String]],
  algorithms: {
    type: String,
    enum: [...Object.keys(Algorithms)]
  },
  optimizers: {
    type: String,
    enum: [...Object.keys(Optimizers)]
  },
  losses: {
    type: String,
    enum: [...Object.keys(Losses)]
  },
  activations: {
    type: String,
    enum: [...Object.keys(Activations)]
  },
  layers: [Number]
});

const Model = mongoose.model('Target', Schema);

module.exports = Model;

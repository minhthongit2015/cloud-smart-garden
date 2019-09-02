
const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
  gardenId: String,
  stationId: String,
  state: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const EnvironmentModel = mongoose.model('environments', EnvironmentSchema);

module.exports = EnvironmentModel;

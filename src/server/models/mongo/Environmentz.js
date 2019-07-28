
const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
  gardenId: String,
  stationId: String,
  state: Object
});
const EnvironmentModel = mongoose.model('environments', EnvironmentSchema);

module.exports = EnvironmentModel;

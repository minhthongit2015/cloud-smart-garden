
const mongoose = require('mongoose');
const Entity = require('./Entity');

const GardenSchema = new mongoose.Schema({
  type: { type: String, default: 'Garden' },
  local_ip: String,
  physical_address: String
});
const GardenModel = Entity.discriminator('Garden', GardenSchema);

module.exports = GardenModel;

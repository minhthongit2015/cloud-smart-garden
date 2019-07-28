
const mongoose = require('mongoose');
const Entity = require('./Entity');

const FarmSchema = new mongoose.Schema({
  type: { type: String, default: 'Farm' },
  local_ip: String,
  physical_address: String
});
const FarmModel = Entity.discriminator('Farm', FarmSchema);

module.exports = FarmModel;

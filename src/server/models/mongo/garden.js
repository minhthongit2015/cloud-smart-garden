
const mongoose = require('mongoose');
const Entity = require('./Entity');

const { Schema } = mongoose;

const GardenSchema = new mongoose.Schema({
  type: { type: String, default: 'Garden' },
  local_ip: String,
  physical_address: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
// const GardenModel = mongoose.model('Garden', GardenSchema, 'Entity');
const GardenModel = Entity.discriminator('Garden', GardenSchema, { discriminatorKey: 'kind' });

module.exports = GardenModel;

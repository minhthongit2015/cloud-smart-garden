
const mongoose = require('mongoose');

const { Schema } = mongoose;

const GardenSchema = new mongoose.Schema({
  type: String,
  avatar: String,
  name: String,
  description: String,
  position: {
    lat: Number,
    lng: Number
  },
  address: String,
  local_ip: String,
  physical_address: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
const GardenModel = mongoose.model('Garden', GardenSchema);

module.exports = GardenModel;

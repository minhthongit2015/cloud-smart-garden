
const mongoose = require('mongoose');

const { Schema } = mongoose;

const EntitySchema = new mongoose.Schema({
  type: String, // garden, farm, food store, tool store
  name: String,
  picture: String,
  cover_image: String,
  description: String,
  position: {
    lat: Number,
    lng: Number
  },
  address: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
const EntityModel = mongoose.model('Entity', EntitySchema);

module.exports = EntityModel;

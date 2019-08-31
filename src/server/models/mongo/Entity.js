
const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  type: String, // Garden, Farm, FoodShop, ToolShop
  name: String,
  picture: String,
  cover: String,
  description: String,
  position: {
    lat: Number,
    lng: Number
  },
  address: String,
  goods: [{ type: Object }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  socials: Object
});
const EntityModel = mongoose.model('Entity', EntitySchema);

module.exports = EntityModel;

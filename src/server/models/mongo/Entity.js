
const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  type: String, // Garden, Farm, FoodShop, ToolShop
  name: String,
  picture: String,
  cover_image: String,
  description: String,
  position: {
    lat: Number,
    lng: Number
  },
  address: String,
  Goods: [{ type: Object }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const EntityModel = mongoose.model('Entity', EntitySchema);

module.exports = EntityModel;

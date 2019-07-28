
const mongoose = require('mongoose');
const Entity = require('./Entity');

const FoodShopSchema = new mongoose.Schema({
  type: { type: String, default: 'FoodShop' }
});
const FoodShopModel = Entity.discriminator('FoodShop', FoodShopSchema);

module.exports = FoodShopModel;

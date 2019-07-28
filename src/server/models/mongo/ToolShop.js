
const mongoose = require('mongoose');
const Entity = require('./Entity');

const ToolShopSchema = new mongoose.Schema({
  type: { type: String, default: 'ToolShop' }
});
const ToolShopModel = Entity.discriminator('ToolShop', ToolShopSchema);

module.exports = ToolShopModel;

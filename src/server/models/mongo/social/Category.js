
const mongoose = require('mongoose');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = new mongoose.Schema({
  parent: { type: ObjectId, ref: ModelName.category },
  children: [{ type: ObjectId, ref: ModelName.category }],
  type: String, // Blog, Garden, Place...
  name: String,
  description: String,
  path: String, // Pathname for rounting with URL
  area: String, // Blog Categories, Garden Categories, Place Categories...
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});

const Model = mongoose.model(ModelName.category, Schema);
module.exports = Model;

const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const Base = require('../blog-base/Post');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  projects: [{ type: ObjectId, ref: 'Project' }],
  members: [{ type: ObjectId, ref: 'User' }]
});
Schema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Team', field: 'order' });
const Model = Base.discriminator('Team', Schema);

module.exports = Model;

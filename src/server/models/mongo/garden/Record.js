const mongoose = require('mongoose');
const { ModelName } = require('../ModelConstants');
const ModelHelper = require('../ModelHelper');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  station: { type: ObjectId, ref: ModelName.station },
  state: Object,
  createdAt: { type: Number, default: Date.now }
};

const [Model] = ModelHelper.createModel(ModelName.record, Schema);

module.exports = Model;

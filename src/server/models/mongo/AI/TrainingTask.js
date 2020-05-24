const mongoose = require('mongoose');
const ModelHelper = require('../ModelHelper');
const { ModelName } = require('../ModelConstants');
const { TaskStatus } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  experiment: { type: ObjectId, ref: ModelName.experiment },
  target: { type: ObjectId, ref: ModelName.experimentTarget },
  trainingSetOptions: {
    dataset: { type: ObjectId, ref: ModelName.dataset }
  },
  modelOptions: Object,
  trainOptions: Object,
  status: { type: String, default: TaskStatus.scheduled, enum: Object.values(TaskStatus) },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
};

const [Model] = ModelHelper.createOrderedModel(ModelName.trainingTask, Schema);

module.exports = Model;

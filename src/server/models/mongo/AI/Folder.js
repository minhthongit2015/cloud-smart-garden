const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  parent: { type: ObjectId, ref: 'Folder' },
  children: [{
    type: ObjectId,
    fileType: {
      type: String,
      required: true,
      enum: ['BaseAIEntity', 'Folder']
    },
    refPath: 'fileType'
  }]
});

const Model = mongoose.model('Folder', Schema);

module.exports = Model;

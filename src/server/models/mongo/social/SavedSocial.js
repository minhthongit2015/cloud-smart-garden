
const mongoose = require('mongoose');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  user: { type: ObjectId, ref: ModelName.user },
  social: { type: ObjectId, refPath: 'socialModel', required: true },
  socialModel: { type: String, required: true },
  createdAt: { type: Number, default: Date.now }
});

let Model;

async function increaseTotalSaved(savedSocial) {
  const SocialModel = mongoose.model(savedSocial.socialModel);
  const social = await SocialModel.findById(savedSocial.social);
  social.totalSaved = (social.totalSaved || 0) + 1;
  social.save();
}

async function decreaseTotalSaved(savedSocial) {
  const SocialModel = mongoose.model(savedSocial.socialModel);
  const social = await SocialModel.findById(savedSocial.social);
  social.totalSaved = Math.max((social.totalSaved || 0) - 1, 0);
  social.save();
}

Schema.post('create', async (savedSocial) => {
  increaseTotalSaved(savedSocial);
}, { query: true, document: true });

Schema.post('updateOne', async (updateResult) => {
  if (updateResult.result.n > 0) {
    const savedSocial = await Model.findById(updateResult.upsertedId);
    increaseTotalSaved(savedSocial);
  }
}, { query: true, document: true });

Schema.post('delete', async (savedSocial) => {
  decreaseTotalSaved(savedSocial);
}, { query: true, document: true });

Schema.post('findOneAndDelete', async (savedSocial) => {
  decreaseTotalSaved(savedSocial);
}, { query: true, document: true });

Model = mongoose.model(ModelName.savedSocial, Schema);

module.exports = Model;

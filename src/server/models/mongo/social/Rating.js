
const mongoose = require('mongoose');
const { ModelName } = require('../ModelConstants');

const { ObjectId } = mongoose.Schema.Types;


const Schema = new mongoose.Schema({
  user: { type: ObjectId, ref: ModelName.user, required: true },
  social: { type: ObjectId, refPath: 'socialModel', required: true },
  socialModel: { type: String, required: true },
  rating: { type: Number, default: 0 },
  type: String
});

Schema.post('save', async (rating) => {
  const SocialModel = mongoose.model(rating.socialModel);
  const social = await SocialModel.findById(rating.social);
  social.totalRating = (social.totalRating || 0) + rating.rating;
  social.totalVotes = (social.totalVotes || 0) + 1;
  social.save();
}, { query: true, document: true });

const Model = mongoose.model(ModelName.rating, Schema);
module.exports = Model;

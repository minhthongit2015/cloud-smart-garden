
const mongoose = require('mongoose');
const { MemberBadge } = require('../../../utils/Constants');

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  password: String,
  role: String,
  name: String,
  email: String,
  picture: String,
  cover: String,
  description: String,
  latestReads: Object,
  age: Number,
  married: Boolean,
  childs: Number,
  salary: Number,
  hoobies: [{ type: String }],
  address: String,
  favorite_foods: [{ type: String }],
  favorite_songs: [{ type: String }],
  personality: [{ type: String }],
  socials: {
    facebook: String,
    twitter: String,
    instagram: String
  },
  socialPoint: {
    type: Number,
    default: 10
  },
  spotlight: Object,
  target: Object,
  badges: [{ type: String, enum: Object.values(MemberBadge) }]
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

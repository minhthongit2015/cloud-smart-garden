
const mongoose = require('mongoose');
const { MemberBadge, UserRole } = require('../../../utils/Constants');

// const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  password: String,
  role: { type: String, enum: Object.values(UserRole) },
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
  socialPoint: { type: Number, default: 10 },
  spotlight: { type: Map, of: Number },
  target: { type: Map, of: Number },
  badges: [{ type: String, enum: Object.values(MemberBadge) }]
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

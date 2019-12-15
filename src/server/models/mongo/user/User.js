
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: Number,
  name: String,
  email: String,
  picture: String,
  cover: String,
  description: String,
  entities: [{ type: ObjectId, ref: 'Entity' }],
  age: Number,
  married: Boolean,
  childs: Number,
  salary: Number,
  hoobies: [{ type: String }],
  address: String,
  favorite_foods: [{ type: String }],
  favorite_songs: [{ type: String }],
  personality: [{ type: String }],
  socials: Object
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

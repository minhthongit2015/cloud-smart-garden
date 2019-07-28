
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  avatar: String,
  username: String,
  password: String,
  name: String,
  email: String,
  description: String,
  type: Number,
  entities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entity' }],
  age: Number,
  married: Boolean,
  childs: Number,
  salary: Number,
  hoobies: [{ type: String }],
  address: String,
  favorite_foods: [{ type: String }],
  favorite_songs: [{ type: String }],
  personality: [{ type: String }]
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

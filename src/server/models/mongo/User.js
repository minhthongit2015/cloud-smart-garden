
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  avatar: String,
  username: String,
  password: String,
  access_token: String,
  name: String,
  email: String,
  description: String,
  type: Number,
  gardens: [{ type: Schema.Types.ObjectId, ref: 'Garden' }]
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

const { User } = require('../models/mongo');

module.exports = class {
  static async authenticate(username, password) {
    // TODO: check username & password from database
    if (!username && !password) {
      return null;
    }

    const user = await User.findOne({
      username, password
    }).exec();

    return user;
  }
};

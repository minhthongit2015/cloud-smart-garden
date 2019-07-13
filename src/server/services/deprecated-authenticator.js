const { User } = require('../models');

module.exports = class {
  static async authenticate(username, password) {
    // TODO: check username & password from database
    if (!username && !password) {
      return null;
    }

    const user = await User.findOne({
      where: {
        username,
        password
      },
      attributes: {
        exclude: ['password']
      }
    });

    return user;
  }
};

const { User } = require('../models');

module.exports = class {
  static async authenticateByToken(accessToken) {
    if (!accessToken) return null;
    const user = await User.findOne({
      where: {
        access_token: accessToken
      },
      attributes: {
        exclude: ['password']
      }
    });
    return user;
  }

  static async authenticate(username, password, accessToken) {
    // TODO: check username & password from database
    if (!username && !password && !accessToken) {
      return null;
    }

    if (accessToken) {
      const user = await this.authenticateByToken(accessToken);
      if (user) return user;
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
    if (user && !user.access_token) {
      await User.update({
        access_token: accessToken
      },
      {
        where: {
          id: user.id
        }
      });
      user.access_token = accessToken;
    }
    return user;
  }
};

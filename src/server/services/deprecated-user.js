const { User } = require('../models/sequelize');

module.exports = class {
  static async register(newUser) {
    if (!newUser.username || !newUser.password) {
      return null;
    }

    const usernameAlreadyExits = await User.findOne({
      where: {
        username: newUser.username
      },
      attribute: {
        exclude: ['password']
      }
    });

    if (usernameAlreadyExits == null) {
      await User.create({
        username: newUser.username,
        password: newUser.password,
        name: newUser.name,
        email: newUser.email
      });

      return newUser;
    }

    return null;
  }

  static async changePassword(username, oldPassword, newPassword) {
    if (!username || !oldPassword || newPassword) {
      return null;
    }
    const user = User.findOne({
      username,
      password: oldPassword
    });

    if (user) {
      user.update({
        password: newPassword
      });

      return user;
    }

    return null;
  }

  static async changeUserInformation(user) {
    if (user) {
      user.update({
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        description: user.description
      });
      return user;
    }

    return null;
  }

  static async changeUserType(user, newType) {
    if (user) {
      user.update({
        type: newType
      });
      return user;
    }
    return null;
  }
};

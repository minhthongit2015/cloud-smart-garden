const { User } = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const { isBlank } = require('../../utils');
const ApiHelper = require('../../utils/ApiHelper');


module.exports = class extends CRUDService {
  static getModel() {
    return User;
  }

  static async create({
    email, password, name, socials, ...rest
  }) {
    // eslint-disable-next-line no-bitwise
    if ((!email) ^ (!password)) {
      return null;
    }
    const userToSave = {
      email, password, name, socials, ...rest
    };
    const newUser = await User.findOne({
      $or: [
        {
          $and: [
            { email: { $ne: null } },
            { email }
          ]
        },
        { 'socials.facebook': socials.facebook }
      ]
    })
      .then(user => user || User.create(userToSave));
    return this.converter.convert(newUser);
  }

  static async updatePassword({ email, oldPassword, newPassword }) {
    if (isBlank(email) || isBlank(oldPassword) || isBlank(newPassword)) {
      return null;
    }
    const [numberOfAffectedRows, affectedRows] = await User.update({
      password: newPassword
    }, {
      where: {
        email,
        password: oldPassword
      },
      returning: true,
      plain: true
    });
    if (numberOfAffectedRows <= 0) {
      return null;
    }

    const updatedUser = affectedRows[0];
    return this.converter.convert(updatedUser);
  }

  static async updateUserRole(userId, newRole) {
    if (isBlank(userId) || isBlank(newRole)) {
      return null;
    }

    const [numberOfAffectedRows, affectedRows] = await User.update({
      newRole,
      where: {
        Id: userId
      }
    });

    if (numberOfAffectedRows < 0) {
      return null;
    }

    const updatedUser = affectedRows[0];
    return this.converter.convert(updatedUser);
  }

  static async updateSocialPoint(user, pointToAdd = 1) {
    const userz = await this.get(ApiHelper.getId(user._id));
    userz.socialPoint = (userz.socialPoint || 0) + pointToAdd;
    await this.update(userz._id, {
      socialPoint: userz.socialPoint
    });
    Object.assign(user, userz);
    user.dirty = true;
    return user;
  }
};

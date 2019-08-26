// const { User } = require('../models/sequelize');
const { isNone } = require('../utils');
const ConverterFactory = require('../models/converters/converter-factory');
const { isBlank, isNotSet } = require('../utils');

module.exports = class {
  static async createUser({
    username, password, name, email
  }) {
    if (isBlank(username) || isBlank(password) || isBlank(name) || isBlank(email)) {
      return null;
    }
    // const insertResult = await User.findOrCreate({
    //   where: {
    //     username
    //   },
    //   default: {
    //     username,
    //     password,
    //     name,
    //     email
    //   }
    // });
    // if (insertResult[1] === false) {
    //   return null;
    // }
    // const insertedUser = insertResult[0];
    // return ConverterFactory.get('user').convert(insertedUser);
  }

  static async get(userId) {
    // const user = await User.findOne({
    //   where: {
    //     id: userId
    //   },
    //   attribute: {
    //     include: ['name', 'avatar', 'email', 'description']
    //   }
    // });
    // if (isNone(user)) {
    //   return null;
    // }
    // return ConverterFactory.get('user').convert(user);
  }

  static async list() {
    // const users = await User.findAll({});
    // return ConverterFactory.get('user').convertCollection(users);
  }

  static async updatePassword({ username, oldPassword, newPassword }) {
    // if (isBlank(username) || isBlank(oldPassword) || isBlank(newPassword)) {
    //   return null;
    // }
    // const [numberOfAffectedRows, affectedRows] = await User.update({
    //   password: newPassword
    // }, {
    //   where: {
    //     username,
    //     password: oldPassword
    //   },
    //   returning: true,
    //   plain: true
    // });
    // if (numberOfAffectedRows <= 0) {
    //   return null;
    // }

    // const updatedUser = affectedRows[0];
    // return ConverterFactory.get('user').convert(updatedUser);
  }

  static async updateUser(userId, updateObject = {
    avatar: undefined,
    name: undefined,
    description: undefined
  }) {
    // Object.keys(updateObject).forEach((key) => {
    //   if (isNotSet(updateObject[key])) {
    //     // eslint-disable-next-line no-param-reassign
    //     delete updateObject[key];
    //   }
    // });
    // const [numberOfAffectedRows, affectedRows] = await User.update(
    //   updateObject,
    //   {
    //     where: {
    //       id: userId
    //     },
    //     returning: true,
    //     plain: true
    //   }
    // );
    // if (numberOfAffectedRows <= 0) {
    //   return null;
    // }

    // const updatedUser = affectedRows[0];
    // return ConverterFactory.get('user').convert(updatedUser);
  }

  static async updateUserType(userId, newType) {
    // if (isBlank(userId) || isBlank(newType)) {
    //   return null;
    // }

    // const [numberOfAffectedRows, affectedRows] = await User.update({
    //   newType,
    //   where: {
    //     Id: userId
    //   }
    // });

    // if (numberOfAffectedRows < 0) {
    //   return null;
    // }

    // const updatedUser = affectedRows[0];
    // return ConverterFactory.get('user').convert(updatedUser);
  }
};

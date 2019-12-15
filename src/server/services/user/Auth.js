const { User } = require('../../models/mongo');
const ConverterFactory = require('../../models/converters/ConverterFactory');

module.exports = class {
  static async authenticate(email, password) {
    // TODO: check username & password from database
    if (!email && !password) {
      return null;
    }

    const user = await User.findOne({
      email, password
    }).exec();

    return ConverterFactory.get(User.modelName).convert(user);
  }
};

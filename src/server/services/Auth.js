const { User } = require('../models/mongo');
const ConverterFactory = require('../models/converters/converter-factory');

module.exports = class {
  static async authenticate(username, password) {
    // TODO: check username & password from database
    if (!username && !password) {
      return null;
    }

    const user = await User.findOne({
      username, password
    }).exec();

    return ConverterFactory.get('user').convert(user);
  }
};

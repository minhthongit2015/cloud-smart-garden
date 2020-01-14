const Converter = require('../converter');

module.exports = class UserConverter extends Converter {
  static get fields() {
    return [
      '_id',
      'name',
      'socials',
      'role',
      'socialPoint',
      'spotlight',
      'target',
      'badges',
      'marks'
    ];
  }
};

const { generateId } = require('./utils');
const { UserRole } = require('../../../utils/Constants');

const users = [
  {
    name: 'Trần Nguyễn Minh Thông',
    role: UserRole.Admin,
    socials: { facebook: '1016602995359074' }
  }
];
generateId(users, 100);

module.exports = users;

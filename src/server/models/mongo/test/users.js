const { generateId } = require('./utils');
const { UserRole } = require('../../../utils/Constants');

const users = [
  {
    name: 'Trần Nguyễn Minh Thông',
    role: UserRole.ADMIN,
    socials: { facebook: '948337288852312' }
  }
];
generateId(users, 100);

module.exports = users;

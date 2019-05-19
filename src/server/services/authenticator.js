

module.exports = class {
  static async authenticate(username, password) {
    // TODO: check username & password from database
    if (username === 'thongnmtran' && password === 'sunday123') {
      return {
        id: 1234,
        name: 'Trần Nguyễn Minh Thông',
        email: 'minhthong.it2015@gmail.com',
        access_token: 'Hello World!',
        expires_in: 1234567890
      };
    }
    return null;
  }
};

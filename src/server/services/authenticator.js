

const ACCESS_TOKEN = 'Hello World!';

module.exports = class {
  static async authenticate(username, password, accessToken) {
    // TODO: check username & password from database
    if ((username === 'thongnmtran' && password === 'sunday123') || accessToken === ACCESS_TOKEN) {
      return {
        id: 1234,
        name: 'Trần Nguyễn Minh Thông',
        email: 'minhthong.it2015@gmail.com',
        access_token: ACCESS_TOKEN,
        expires_in: 1234567890
      };
    }
    return null;
  }
};

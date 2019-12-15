const supperagent = require('superagent');
const graph = require('fbgraph');
const Config = require('../../config');

module.exports = class {
  static async getUserByToken(accessToken) {
    if (!accessToken) return null;
    graph.setAccessToken(accessToken);
    return new Promise((resolve, reject) => {
      graph.get('me?fields=first_name,last_name,name,short_name', (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  static getServerAccessToken() {
    graph.getAccessToken();
  }

  static async refreshCache(url) {
    return supperagent.get('https://graph.facebook.com').query({
      id: url,
      scrape: true
    });
  }

  static async getUserByCode(code) {
    return new Promise((resolve, reject) => {
      graph.authorize({
        client_id: Config.facebook.CLIENT_ID,
        redirect_uri: Config.facebook.REDIRECT_URL,
        client_secret: Config.facebook.CLIENT_SECRET,
        code
      }, (err, facebookRes) => {
        if (!err) {
          resolve(facebookRes);
        } else {
          reject(err);
        }
      });
    });
  }
};

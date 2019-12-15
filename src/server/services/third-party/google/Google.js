const { google } = require('googleapis');
const Photos = require('googlephotos');
const fs = require('fs');
const superagent = require('superagent');
const Config = require('../../../config');

const oauth2Client = new google.auth.OAuth2(
  Config.google.photo.CLIENT_ID,
  Config.google.photo.CLIENT_SECRET,
  Config.google.photo.REDIRECT_URL
);
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// const PHOTO_ENDPOINT = 'https://photoslibrary.googleapis.com/v1';
// Photos.prototype.mediaItems.create = () => {
//   superagent.post(`${PHOTO_ENDPOINT}/mediaItems:batchCreate`)
//     .send({

//     });
// };

module.exports = class {
  static get instance() {
    return this._google;
  }

  static get tokens() {
    if (!this._tokens) {
      this._tokens = JSON.parse(fs.readFileSync('./tokens'));
    }
    return this._tokens;
  }

  static set tokens(tokens) {
    if (!tokens) {
      return;
    }
    fs.writeFileSync('./tokens', JSON.stringify(tokens));
    this._tokens = tokens;
  }

  static get oauth2Client() {
    return oauth2Client;
  }

  static async auth() {
    const authClient = await auth.getClient();
    return authClient;
  }

  static oauth2() {
    const scopes = [
      Photos.Scopes.READ_AND_APPEND,
      Photos.Scopes.SHARING
    ];
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
    return url;
  }

  static async saveTokenFromCode(code) {
    const { tokens } = await oauth2Client.getToken(code);
    this.tokens = tokens;
    return tokens;
  }

  static async test() {
    if (!this.tokens) return null;
    const photos = new Photos(this.tokens.access_token);
    const albums = await photos.albums.list();
    const images = await superagent.get(`https://photoslibrary.googleapis.com/v1/mediaItems?access_token=${this.tokens.access_token}`).then();
    return albums;
  }
};

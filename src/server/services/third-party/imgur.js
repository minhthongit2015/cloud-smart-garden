const superagent = require('superagent');

const CLIENT_ID = '5c554fb08f17da4';

module.exports = class {
  static oauth2() {

  }

  static saveTokenFromCode() {

  }

  static getAutoAlbum() {
    return '45kdOjz6veeZITT';
  }

  static createAlbum() {
    return superagent.post('https://api.imgur.com/3/album')
      .set('Authorization', `Client-ID ${CLIENT_ID}`)
      .send({
        title: 'test album'
      });
  }

  static async create(image, {
    name, title, album
  }) {
    if (image.startsWith('http')) {
      return image;
    }
    if (image.startsWith('data:image') || image.startsWith('data:video')) {
      image = image.slice(image.indexOf(',') + 1);
    }
    return superagent.post('https://api.imgur.com/3/upload')
      .set('Authorization', 'Client-ID 5c554fb08f17da4')
      .send({
        image,
        type: 'base64',
        name,
        title,
        album: album || this.getAutoAlbum()
      }).then(img => img.body.data.link);
  }
};

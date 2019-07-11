/* Flow */

module.exports = class Serializer {
  static serialze(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static serialzeCollection(collection) {
    return collection.map(object => this.serialze(object));
  }
};

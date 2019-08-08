
module.exports = class Serializer {
  static convert(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static convertCollection(collection) {
    return collection.map(object => this.convert(object));
  }
};

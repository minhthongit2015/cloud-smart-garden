
module.exports = class Converter {
  static get fields() {
    return null;
  }

  static convert(object) {
    if (!object) return object;
    const rawObject = JSON.parse(JSON.stringify(object));
    if (rawObject && this.fields) {
      const filteredObject = {};
      this.fields.forEach((field) => {
        filteredObject[field] = rawObject[field];
      });
      return filteredObject;
    }
    return rawObject;
  }

  static convertCollection(collection) {
    return (collection || []).map(object => this.convert(object));
  }
};

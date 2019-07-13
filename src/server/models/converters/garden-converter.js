
const Converter = require('./converter');

module.exports = class extends Converter {
  static convert(object) {
    const rawGarden = JSON.parse(JSON.stringify(object));
    const garden = {
      name: rawGarden.name
      
    };
    return garden;
  }
};


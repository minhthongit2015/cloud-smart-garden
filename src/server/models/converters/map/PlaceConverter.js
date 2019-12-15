const Converter = require('../converter');
const UserConverter = require('../user/UserConverter');

module.exports = class PlaceConverter extends Converter {
  static convert(object) {
    if (!object) return object;
    const rawPlace = JSON.parse(JSON.stringify(object));
    const place = {
      ...rawPlace,
      author: UserConverter.convert(rawPlace.author),
      user: UserConverter.convert(rawPlace.user),
      members: UserConverter.convertCollection(rawPlace.members)
    };
    return place;
  }
};

const Converter = require('../converter');

module.exports = class RatingConverter extends Converter {
  static convert(object) {
    if (!object) return object;
    const rawRating = JSON.parse(JSON.stringify(object));
    return {
      _id: rawRating._id,
      rating: rawRating.rating,
      user: super.convert(rawRating.user),
      post: super.convert(rawRating.post)
    };
  }
};

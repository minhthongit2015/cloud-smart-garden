
const {
  Place, EventMarker,
  GardenMarker, FarmMarker, FoodStoreMarker, ToolStoreMarker, CharityRestaurantMarker
} = require('../../models/mongo');
const CRUDService = require('../CRUDService');
const ApiHelper = require('../../utils/ApiHelper');
const ImgurService = require('../third-party/imgur');

const PlaceTypes = [
  Place, EventMarker,
  GardenMarker, FarmMarker, FoodStoreMarker, ToolStoreMarker, CharityRestaurantMarker
];

module.exports = class extends CRUDService {
  static getModel(place) {
    if (!place || !place.__t) {
      return Place;
    }
    return PlaceTypes.find(type => type.modelName === place.__t) || Place;
  }

  static get populate() {
    return ['author', 'user', 'post', 'members', 'leaders'];
  }

  static resolveListOptions(opts = ApiHelper.listParams) {
    ApiHelper.SortBuilder.add(opts, '-createdAt');
    return opts;
  }

  static create(place, user) {
    if (user) {
      place.author = ApiHelper.getId(user._id);
    }
    return super.create.call(this, place);
  }

  static async createOrUpdate(place, where) {
    if (place.cover) {
      place.cover = await ImgurService.create(place.cover, {
        title: place.name
      });
    }
    if (place.avatar) {
      place.avatar = await ImgurService.create(place.avatar, {
        title: place.name
      });
    }
    return super.createOrUpdate.call(this, place, where);
  }

  static async getByOrder(baseOrder) {
    return super.first({ where: { baseOrder } });
  }
};

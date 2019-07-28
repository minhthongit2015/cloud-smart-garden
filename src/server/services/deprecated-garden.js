
const { UserGarden, Garden } = require('../models/sequelize');
const SerializerFactory = require('../models/converters/converter-factory');

module.exports = class GardenService {
  static async getById(gardenId) {
    return Garden.findOne({
      where: {
        id: gardenId
      }
    }).then(garden => SerializerFactory.get('garden').serialze(garden));
  }

  static async getGardensByOwner(userId) {
    return UserGarden.findAll({
      where: {
        user_id: userId
      },
      include: [
        {
          model: Garden
        }
      ]
    }).then(gardens => SerializerFactory.get('user-garden').serialzeCollection(gardens));
  }

  static async getGardenByPhysicalAddress(physicalAddress) {
    return Garden.findOne({
      where: {
        physical_address: physicalAddress
      }
    }).then(garden => SerializerFactory.get('garden').serialze(garden));
  }

  static async updateLocalIP(id, localIP) {
    return Garden.update({
      local_ip: localIP
    }, {
      where: {
        id
      }
    });
  }
};

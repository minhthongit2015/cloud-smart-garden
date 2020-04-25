// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Station } = require('../../models/mongo');
const SocialService = require('../social/SocialService');
const UserPlantService = require('./UserPlantService');


module.exports = class extends SocialService {
  static getModel() {
    return Station;
  }

  static get populate() {
    return ['models', 'plants', ['garden', '_id title']];
  }

  static async addUserPlant(stationId, plantId) {
    const station = await this.get({ id: stationId });
    if (!station) {
      return null;
    }
    if (!station.plants) {
      station.plants = [];
    }
    const userPlant = await UserPlantService.create({
      doc: {
        plant: plantId
      }
    });
    station.plants.unshift(userPlant._id);
    return this.update({
      id: stationId,
      doc: {
        plants: station.plants
      }
    });
  }

  static async removeUserPlant(userPlantId, stationId) {
    const station = await this.get({ id: stationId });
    if (!station || !station.plants) return null;

    station.plants.splice(station.plants.indexOf(userPlantId));
    const updatedStation = await this.update({
      id: stationId,
      doc: {
        plants: station.plants
      }
    });

    await UserPlantService.delete({ id: userPlantId });
    return updatedStation;
  }
};

// const moment = require('moment');
// const ApiHelper = require('../../utils/ApiHelper');
const { Station } = require('../../models/mongo');
const PostService = require('../blog/PostServ');
const UserPlantService = require('./UserPlantServ');


module.exports = class extends PostService {
  static getModel() {
    return Station;
  }

  static get populate() {
    return ['models', 'plants'];
  }

  static async addUserPlant(stationId, plantId) {
    const station = await this.get(stationId);
    if (!station) {
      return null;
    }
    if (!station.plants) {
      station.plants = [];
    }
    const userPlant = await UserPlantService.create({
      plant: plantId
    });
    station.plants.unshift(userPlant._id);
    return this.update(stationId, {
      plants: station.plants
    });
  }

  static async removeUserPlant(userPlantId, stationId) {
    const station = await this.get(stationId);
    if (!station || !station.plants) return null;

    station.plants.splice(station.plants.indexOf(userPlantId));
    const updatedStation = await this.update(stationId, {
      plants: station.plants
    });

    await UserPlantService.delete(userPlantId);
    return updatedStation;
  }
};

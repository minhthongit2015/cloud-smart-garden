import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';
import SocialService from '../social/SocialService';
import { ModelName } from '../../utils/Constants';


export default class extends SocialService {
  static get model() {
    return ModelName.userPlant;
  }

  static async addUserPlant(stationId, plant, name) {
    return superrequest.post(ApiEndpoints.userPlants, { stationId, plant, name });
  }

  static async removeUserPlant(userPlantId, stationId) {
    return superrequest.delete(ApiEndpoints.userPlants, { userPlantId, stationId });
  }
}

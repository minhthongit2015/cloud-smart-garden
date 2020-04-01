import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';
import PostService from '../blog/PostService';


export default class extends PostService {
  static async fetchPlants() {
    return this.fetchPosts(this.defaultEndpoint, 'Plant');
  }

  static async addUserPlant(stationId, plant, name) {
    return superrequest.post(ApiEndpoints.userPlants, { stationId, plant, name });
  }

  static async removeUserPlant(userPlantId, stationId) {
    return superrequest.delete(ApiEndpoints.userPlants, { userPlantId, stationId });
  }
}

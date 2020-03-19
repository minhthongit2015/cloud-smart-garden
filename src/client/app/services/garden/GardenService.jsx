import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';
import PostService from '../blog/PostService';


export default class GardenService extends PostService {
  static get defaultEndpoint() {
    return ApiEndpoints.myGardens;
  }

  static async fetchMyGarden() {
    return superrequest.get(
      ApiEndpoints.builder(this.defaultEndpoint).limit(1)
    );
  }
}

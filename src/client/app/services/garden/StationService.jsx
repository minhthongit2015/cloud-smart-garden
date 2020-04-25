import SocialService from '../social/SocialService';
import { ModelName } from '../../utils/Constants';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class extends SocialService {
  static get model() {
    return ModelName.station;
  }

  static get createEndpoint() {
    return ApiEndpoints.stations;
  }

  static get listEndpoint() {
    return ApiEndpoints.stations;
  }

  static get getEndpoint() {
    return ApiEndpoints.stations;
  }
}

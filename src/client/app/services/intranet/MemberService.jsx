import { ModelName } from '../../utils/Constants';
import CRUDService from '../CRUDService';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class extends CRUDService {
  static get model() {
    return ModelName.user;
  }

  static get baseEndpoint() {
    return ApiEndpoints.members;
  }
}

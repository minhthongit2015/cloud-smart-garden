import SocialService from '../social/SocialService';
import { ModelName } from '../../utils/Constants';


export default class extends SocialService {
  static get model() {
    return ModelName.plant;
  }
}

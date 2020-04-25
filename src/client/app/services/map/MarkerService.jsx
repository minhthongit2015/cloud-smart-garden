import SocialService from '../social/SocialService';
import { MarkerTypes } from '../../utils/Constants';


export default class extends SocialService {
  static get model() {
    return MarkerTypes.place;
  }
}

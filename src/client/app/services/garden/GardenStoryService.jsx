import SocialService from '../social/SocialService';
import { ModelName } from '../../utils/Constants';
import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class extends SocialService {
  static get model() {
    return ModelName.gardenStory;
  }

  static async list({
    limit, offset, sort, where, model
  } = {}) {
    return superrequest.get(
      ApiEndpoints.builder(this.listEndpoint).model(model || this.model)
        .limit(limit).offset(offset)
        .where(where)
        .sort(`${sort || ''} -createdAt`)
    );
  }
}

import superrequest from '../../utils/superrequest';
import UserService from '../user/UserService';
import ApiEndpoints from '../../utils/ApiEndpoints';
import { ModelName } from '../../utils/Constants';
import CRUDService from '../CRUDService';


export default class extends CRUDService {
  static get model() {
    return ModelName.social;
  }

  static get ratingEndpoint() {
    return ApiEndpoints.rating;
  }

  static get savedEndpoint() {
    return ApiEndpoints.savedSocialEntity;
  }

  static async save(_id, { model }) {
    return superrequest.agentPost(
      ApiEndpoints.builder(this.savedEndpoint).entityI(_id).model(model || this.model)
    );
  }

  static async unsave(_id, { model }) {
    return superrequest.agentDelete(
      ApiEndpoints.builder(this.savedEndpoint).entityI(_id).model(model || this.model)
    );
  }

  static async rating(_id, rating, { model }) {
    return superrequest.agentPost(
      ApiEndpoints.builder(this.ratingEndpoint).entityI(_id).model(model || this.model),
      { rating }
    );
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}

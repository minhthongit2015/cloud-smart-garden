import superrequest from '../utils/superrequest';
import ApiEndpoints from '../utils/ApiEndpoints';
import { ModelName } from '../utils/Constants';


export default class {
  static get model() {
    return ModelName.social;
  }

  static get baseEndpoint() {
    return ApiEndpoints.social;
  }

  static get createEndpoint() {
    return this.baseEndpoint;
  }

  static get getEndpoint() {
    return this.baseEndpoint;
  }

  static get listEndpoint() {
    return this.baseEndpoint;
  }

  static get deleteEndpoint() {
    return this.baseEndpoint;
  }

  static async create(entity, { model }) {
    return superrequest.agentPost(
      ApiEndpoints.builder(this.createEndpoint).model(model || this.model),
      entity
    );
  }

  static async update(entity, { model }) {
    return superrequest.agentPost(
      ApiEndpoints.builder(this.createEndpoint).model(model || this.model),
      entity
    );
  }

  static async get(_id, { model }) {
    return superrequest.get(
      ApiEndpoints.builder(this.getEndpoint).entityI(_id).model(model || this.model)
    );
  }

  static async getByOrder(order, { model }) {
    return superrequest.get(
      ApiEndpoints.builder(this.getEndpoint).orderI(order).model(model || this.model)
    );
  }

  static async getByOrder2(order2, { model }) {
    return superrequest.get(
      ApiEndpoints.builder(this.getEndpoint).order2I(order2).model(model || this.model)
    );
  }

  static async list({
    limit, offset, sort, where, model
  } = {}) {
    return superrequest.get(
      ApiEndpoints.builder(this.listEndpoint).model(model || this.model)
        .limit(limit).offset(offset)
        .where(where)
        .sort(sort)
    );
  }

  static async delete(_id, { model }) {
    return superrequest.agentDelete(
      ApiEndpoints.builder(this.deleteEndpoint).entityI(_id).model(model || this.model)
    );
  }

  static async deleteByOrder(order, { model }) {
    return superrequest.agentDelete(
      ApiEndpoints.builder(this.deleteEndpoint).orderI(order).model(model || this.model)
    );
  }
}

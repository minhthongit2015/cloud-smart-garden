
import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';
import SocialService from '../social/SocialService';
import { ModelName } from '../../utils/Constants';


export default class DatasetService extends SocialService {
  static get model() {
    return ModelName.dataset;
  }

  static get createEndpoint() {
    return ApiEndpoints.datasets;
  }

  static fetchDataset(datasetId) {
    return superrequest.get(ApiEndpoints.datasetI(datasetId));
  }

  static fetchDatasets() {
    return superrequest.get(ApiEndpoints.builder(ApiEndpoints.datasets).sortCreated());
  }

  static updateDataset(dataset) {
    superrequest.put(ApiEndpoints.datasetI(1), dataset);
  }

  static regenerateRecords(datasetId) {
    return superrequest.post(ApiEndpoints.regenerateDatasetIRecords(datasetId));
  }
}

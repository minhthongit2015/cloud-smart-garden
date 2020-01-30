
import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class DatasetService {
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

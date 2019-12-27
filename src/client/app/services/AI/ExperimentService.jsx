
import queryString from 'query-string';
import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';

export default class ExperimentService {
  static fetchDataset({ limit = 0, offset = 0, order = 'createdAt' }) {
    const query = queryString.stringify({ limit, offset, order });
    return superrequest.get(`${ApiEndpoints.datasetI(1)}?${query}`);
  }

  static updateDataset(dataset) {
    superrequest.put(ApiEndpoints.datasetI(1), dataset);
  }

  static buildExperiment(buildOptions) {
    superrequest.post(ApiEndpoints.buildExperimentI(1), buildOptions);
  }

  static subscribeTrainingProgress(callback) {
    superrequest.ws.on('training', callback);
  }
}

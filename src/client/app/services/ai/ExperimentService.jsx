
import queryString from 'query-string';
import superrequest from '../../utils/superrequest';
import { apiEndpoints } from '../../utils/Constants';

export default class ExperimentService {
  static fetchDataset({ limit = 0, offset = 0, order = 'createdAt' }) {
    const query = queryString.stringify({ limit, offset, order });
    return superrequest.get(`${apiEndpoints.ai.datasets.ITEM(1)}?${query}`);
  }

  static updateDataset(dataset) {
    superrequest.put(apiEndpoints.ai.datasets.ITEM(1), dataset);
  }

  static buildExperiment(buildOptions) {
    superrequest.post(apiEndpoints.ai.experiments.BUILD(1), buildOptions);
  }

  static subscribeTrainingProgress(callback) {
    superrequest.ws.on('training', callback);
  }
}

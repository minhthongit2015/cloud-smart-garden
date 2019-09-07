
import queryString from 'query-string';
import superrequest from '../../utils/superrequest';
import { apiEndpoints } from '../../utils/Constants';

export default class ExperimentService {
  static fetchDataset({ limit = 0, offset = 0, order = [] }) {
    const query = queryString.stringify({ limit, offset, order });
    return superrequest.get(`${apiEndpoints.ai.datasetItem(1)}?${query}`);
  }

  static updateDataset(dataset) {
    superrequest.put(apiEndpoints.ai.datasetItem(1), dataset);
  }
}

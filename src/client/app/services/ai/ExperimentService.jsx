
import superrequest from '../../utils/superrequest';
import { apiEndpoints } from '../../utils/Constants';


export default class ExperimentService {
  static fetchDataset() {
    return superrequest.get(`${apiEndpoints.ai.datasetItem(1)}?limit=100`);
  }
}

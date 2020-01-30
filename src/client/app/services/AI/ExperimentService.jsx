import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class ExperimentService {
  static buildExperiment(experimentId, buildOptions) {
    superrequest.post(ApiEndpoints.buildExperimentI(experimentId), buildOptions);
  }

  static subscribeTrainingProgress(callback) {
    superrequest.ws.on('training', callback);
  }
}

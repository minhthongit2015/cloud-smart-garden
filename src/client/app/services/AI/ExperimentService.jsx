import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class ExperimentService {
  static buildExperiment(experimentId, buildOptions) {
    superrequest.post(ApiEndpoints.buildExperimentI(experimentId), buildOptions);
  }

  static subscribeTrainingProgress(callback, onStart) {
    superrequest.ws.off('training');
    superrequest.ws.on('training', callback);
    superrequest.ws.off('startTraining');
    superrequest.ws.on('startTraining', onStart);
  }

  static stopTraining() {
    superrequest.ws.off('training');
    superrequest.ws.off('startTraining');
    superrequest.post(ApiEndpoints.stopTraining);
  }
}

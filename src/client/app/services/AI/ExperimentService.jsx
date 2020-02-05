import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class ExperimentService {
  static buildExperiment(experimentId, buildOptions) {
    superrequest.post(ApiEndpoints.buildExperimentI(experimentId), buildOptions);
  }

  static subscribeTrainingProgress(onProgress, onBegin, onEnd) {
    this.unsubscribeTrainingProgress();
    superrequest.ws.on('trainProgress', onProgress);
    superrequest.ws.on('trainBegin', onBegin);
    superrequest.ws.on('trainEnd', onEnd);
  }

  static unsubscribeTrainingProgress() {
    superrequest.ws.off('trainProgress');
    superrequest.ws.off('trainBegin');
    superrequest.ws.off('trainEnd');
  }

  static stopTraining() {
    superrequest.post(ApiEndpoints.stopTraining);
  }
}

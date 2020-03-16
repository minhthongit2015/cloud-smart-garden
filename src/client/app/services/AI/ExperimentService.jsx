import superrequest from '../../utils/superrequest';
import ApiEndpoints from '../../utils/ApiEndpoints';


export default class ExperimentService {
  static buildExperiment(experimentId, buildOptions) {
    return superrequest.post(ApiEndpoints.buildExperimentI(experimentId), buildOptions);
  }

  static compare(experimentId, compareOptions) {
    return superrequest.post(ApiEndpoints.compareExperimentI(experimentId), compareOptions);
  }

  static overrideModel(experiment, target) {
    return superrequest.post(ApiEndpoints.overrideModel, { experiment, target });
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
    return superrequest.post(ApiEndpoints.stopTraining);
  }
}

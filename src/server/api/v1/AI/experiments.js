const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
// const ExperimentService = require('../../../services/AI/management/Experiment');
const AIExperimentService = require('../../../services/AI/AIExperiment');

router.get('/test', Logger.catch(async (req, res) => {
  const trainedModel = await AIExperimentService.test();
  // await ExperimentService.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

router.post('/:experimentId/build', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainedModel = await AIExperimentService.buildAndTrain(experimentId, req.body);
  // await AIExperimentService.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

module.exports = router;

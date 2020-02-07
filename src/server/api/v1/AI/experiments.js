const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const ExperimentService = require('../../../services/AI/ExperimentServ');


router.get('/test', Logger.catch(async (req, res) => {
  const trainedModel = await ExperimentService.test(req.query);
  // await ExperimentService.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

router.post('/stop-training', Logger.catch(async (req, res) => {
  await ExperimentService.stopTraining();
  return res.send(APIResponse.SUCCESS);
}));

router.post('/:experimentId/build', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainedModels = await ExperimentService.buildAndTrain(experimentId, req.body);
  const mappedModels = trainedModels.map(model => JSON.parse(JSON.parse(JSON.stringify(model))));
  return res.send(APIResponse.setData(mappedModels));
}));

router.post('/:experimentId/compare', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainingSets = await ExperimentService.compare(experimentId, req.body);
  return res.send(APIResponse.setData(trainingSets));
}));

module.exports = router;

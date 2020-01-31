const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const ExperimentService = require('../../../services/AI/ExperimentServ');


router.get('/test', Logger.catch(async (req, res) => {
  const trainedModel = await ExperimentService.test();
  // await ExperimentService.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

router.post('/:experimentId/build', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainedModel = await ExperimentService.buildAndTrain(experimentId, req.body);
  // await ExperimentService.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

module.exports = router;

const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const Trainer = require('../../../services/AI/training/Trainer');


router.get('/test', Logger.catch(async (req, res) => {
  const trainedModel = await Trainer.test(req.query);
  // await Trainer.save(experimentId, trainedModel);
  return res.send(APIResponse.setData(trainedModel));
}));

router.post('/:experimentId/stop-training', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const { target } = req.body;
  await Trainer.stopTraining({ experiment: experimentId, target });
  return res.send(APIResponse.SUCCESS);
}));

router.post('/:experimentId/build', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  await Trainer.buildAndTrain({
    experiment: experimentId,
    ...req.body
  });
  return res.send(APIResponse.SUCCESS);
}));

router.post('/:experimentId/compare', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainingSets = await Trainer.compare(experimentId, req.body);
  return res.send(APIResponse.setData(trainingSets));
}));

module.exports = router;

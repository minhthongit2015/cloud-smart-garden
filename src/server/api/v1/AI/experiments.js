const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const ExperimentService = require('../../../services/AI/Experiments');

router.get('/', Logger.catch(async (req, res) => {
  const { limit, offset, sort } = req.query;
  const dataset = await ExperimentService.list({ limit, offset, sort });
  res.send(new APIResponse().setData(dataset));
}));

router.get('/:experimentId', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const dataset = await ExperimentService.get(experimentId);
  res.send(new APIResponse().setData(dataset));
}));

// eslint-disable-next-line no-unused-vars
router.post('/', (req, res) => {
  // Create experiment
});

router.post('/:experimentId/build', Logger.catch(async (req, res) => {
  const { experimentId } = req.params;
  const trainedModel = await ExperimentService.build(experimentId, req.body);
  await ExperimentService.save(experimentId, trainedModel);
  res.send(new APIResponse().setData(trainedModel));
}));

module.exports = router;

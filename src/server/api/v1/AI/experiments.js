const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const ExperimentService = require('../../../services/AI/Experiments');

router.get('/', (req, res) => {
  Logger.catch(async () => {
    const { limit, offset, sort } = req.query;
    const dataset = await ExperimentService.list({ limit, offset, sort });
    res.send(new APIResponse().setData(dataset));
  }, { req, res });
});

router.get('/:experimentId', (req, res) => {
  Logger.catch(async () => {
    const { experimentId } = req.params;
    const dataset = await ExperimentService.get(experimentId);
    res.send(new APIResponse().setData(dataset));
  }, { req, res });
});

// eslint-disable-next-line no-unused-vars
router.post('/', (req, res) => {
  // Create experiment
});

router.post('/:experimentId/build', (req, res) => {
  Logger.catch(async () => {
    const { experimentId } = req.params;
    const trainedModel = await ExperimentService.build(experimentId, req.body);
    await ExperimentService.save(experimentId, trainedModel);
    res.send(new APIResponse().setData(trainedModel));
  }, { req, res });
});

module.exports = router;

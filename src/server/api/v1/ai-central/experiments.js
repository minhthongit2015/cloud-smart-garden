const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const ExperimentService = require('../../../services/ai/Experiments');

router.get('/', (req, res) => {
  Logger.catch(async () => {
    const { limit, offset, sort } = req.query;
    const dataset = await ExperimentService.list({ limit, offset, sort });
    res.send(new APIResponse().setData(dataset));
  });
});

router.get('/:experimentId', (req, res) => {
  Logger.catch(async () => {
    const { experimentId } = req.params;
    const dataset = await ExperimentService.get(experimentId);
    res.send(new APIResponse().setData(dataset));
  });
});

router.post('/', (req, res) => {
  // Create experiment
});

router.put('/:experimentId', (req, res) => {
  // Save new experiment design
});

router.post('/:experimentId/build', (req, res) => {
  Logger.catch(async () => {
    const { experimentId } = req.params;
    const trainedModel = await ExperimentService.build(experimentId, req.body);
    res.send(new APIResponse().setData(trainedModel));
  });
});

module.exports = router;

const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const DatasetService = require('../../../services/ai/Dataset');

router.get('/', (req, res) => {
  Logger.catch(() => {
    res.send(new APIResponse().setData([
      { id: 1, name: 'Realtime Dataset' }
    ]));
  });
});

router.get('/:datasetId', (req, res) => {
  Logger.catch(async () => {
    // const demoData = require('./data');
    const { limit, offset, sort } = req.query;
    const dataset = await DatasetService.list({ limit, offset, sort });
    res.send(new APIResponse().setData(dataset));
  });
});

module.exports = router;

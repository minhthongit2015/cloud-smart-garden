const router = require('express').Router();
const Logger = require('../../../services/Logger');
const ApiResponse = require('../../../models/api-models');
const DatasetService = require('../../../services/ai/Dataset');

router.get('/', (req, res) => {
  Logger.catch(() => {
    res.send(new ApiResponse().setData([
      { id: 1, name: 'Realtime Dataset' }
    ]));
  }, { req, res });
});

router.get('/:datasetId', (req, res) => {
  Logger.catch(async () => {
    // const demoData = require('./data');
    const { limit, offset, sort } = req.query;
    const dataset = await DatasetService.list({ limit, offset, sort });
    res.send(new ApiResponse().setData(dataset));
  }, { req, res });
});

router.put('/:datasetId', (req, res) => {
  Logger.catch(async () => {
    const { datasetId } = req.params;
    const dataset = req.body;
    await DatasetService.update(datasetId, dataset);
    res.send(new ApiResponse().success());
  }, { req, res });
});

module.exports = router;

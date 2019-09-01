const router = require('express').Router();
const Logger = require('../../../services/Logger');
const demoData = require('./data');
const APIResponse = require('../../../models/api-models');

router.get('/', (req, res) => {
  Logger.catch(() => {
    res.send(new APIResponse().setData([
      { id: 1, name: 'Realtime Dataset' }
    ]));
  });
});

router.get('/:datasetId', async (req, res) => {
  Logger.catch(() => {
    res.send(new APIResponse().setData(demoData));
  });
});

module.exports = router;

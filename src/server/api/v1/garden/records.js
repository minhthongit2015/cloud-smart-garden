const router = require('express').Router();
const SyncService = require('../../../services/sync');

const Logger = require('../../../services/Logger');

// Station state send from the station
router.post('/', (req, res) => {
  Logger.catch(async () => {
    SyncService.broadcast(req.socket, 'stateChange', req.body);
    if (res.end) res.end();
  }, { req, res });
});

module.exports = router;

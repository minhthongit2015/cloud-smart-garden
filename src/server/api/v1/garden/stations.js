const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SyncService = require('../../../services/sync');

router.post('/verify', (req, res) => {
  Logger.catch(async () => {
    res.emit('accept');
    res.end();
  }, { req, res });
});

router.post('/set-state', (req, res) => {
  Logger.catch(async () => {
    SyncService.emit('commnad', req.body);
    res.end();
  }, { req, res });
});

module.exports = router;

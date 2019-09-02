const router = require('express').Router();
const EnvironmentService = require('../../../../services/Environment');

const Debugger = require('../../../../services/Debugger');


router.post('/state', async (req, res) => {
  Debugger.wsRouting('Station state: ', req.sessionID);
  EnvironmentService.create({
    gardenId: 1,
    stationId: 1,
    state: req.body
  });
  res.emit('POST/station', { faker: 123 });
});

module.exports = router;

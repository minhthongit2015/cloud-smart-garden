const router = require('express').Router();
const EnvironmentService = require('../../services/environment');

router.post('/data', async (req, res) => {
  res.send('hello API');
  EnvironmentService.resolveStationEnvironmentData();
});

module.exports = router;

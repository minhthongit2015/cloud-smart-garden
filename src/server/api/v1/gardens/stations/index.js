const router = require('express').Router();
const EnvironmentService = require('../../../../services/Environment');

const Logger = require('../../../../services/Logger');


router.post('/:stationId/state', async (req, res) => {
  Logger.catch(() => {
    const { stationId } = req.params;
    const { garden } = req.session;
    EnvironmentService.create({
      gardenId: (garden && garden.id) || 1,
      stationId,
      state: req.body
    });
  }, { req, res });
});

module.exports = router;

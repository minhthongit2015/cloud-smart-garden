const router = require('express').Router();
const EnvironmentService = require('../../../../services/Environment');

const Logger = require('../../../../services/Logger');


router.post('/:stationId/state', (req, res) => {
  Logger.catch(async () => {
    const { stationId } = req.params;
    const { garden } = req.session;
    await EnvironmentService.create({
      gardenId: (garden && garden.id) || 1,
      stationId,
      state: req.body
    });
  }, { req, res });
});

module.exports = router;

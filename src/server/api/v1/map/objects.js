const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');
const MapService = require('../../../services/Map.js');

router.get('/list', async (req, res) => {
  try {
    const objects = await MapService.list();
    return res.send(new APIResponse({ data: { objects } }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse({ error: { message: error.message, stack: error.stack } })
    );
  }
});

module.exports = router;

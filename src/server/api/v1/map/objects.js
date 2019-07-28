const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const ErrorService = require('../../../services/Error');
const MapService = require('../../../services/Map.js');

router.get('/list/:uid?', async (req, res) => {
  try {
    const objects = await MapService.list();
    return res.send(new APIResponse({ data: { objects } }));
  } catch (error) {
    return ErrorService.defaultAPIErrorHandler(error, res);
  }
});

module.exports = router;

const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const ErrorService = require('../../../services/Error');
const MapService = require('../../../services/map');

router.get('/list', async (req, res) => {
  try {
    const entities = await MapService.list();
    return res.send(new APIResponse({ data: { entities } }));
  } catch (error) {
    return ErrorService.defaultAPIErrorHandler(error, res);
  }
});

module.exports = router;

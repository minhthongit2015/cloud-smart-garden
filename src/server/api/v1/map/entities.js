const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const ErrorService = require('../../../services/Error');
const MapService = require('../../../services/map');

router.get('/list', async (req, res) => {
  try {
    const { limit, offset, sort } = req.query;
    const entities = await MapService.list({
      limit, offset, sort
    });
    const { user } = req.session;
    if (user) {
      entities.filter(entity => entity.users.includes(user._id))
        .forEach((entity) => {
          entity.owned = true;
        });
    }
    return res.send(new APIResponse().setData({ entities }));
  } catch (error) {
    return ErrorService.defaultAPIErrorHandler(error, res);
  }
});

module.exports = router;

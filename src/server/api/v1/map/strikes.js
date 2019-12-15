const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const StrikeService = require('../../../services/map/Strike');
const MapSecurityService = require('../../../services/security/MapSecurity');

router.post('/join/:strikeId', (req, res) => {
  Logger.catch(async () => {
    await MapSecurityService.onlyLoggedInUser(req);
    const { strikeId } = req.params;
    const strike = await StrikeService.join(req.session.user, strikeId);
    if (!strike) {
      return res.send(APIResponse.throwError.NotFound());
    }
    return res.send(APIResponse.setData(strike));
  }, { req, res });
});

router.post('/leave/:strikeId', (req, res) => {
  Logger.catch(async () => {
    await MapSecurityService.onlyLoggedInUser(req);
    const { strikeId } = req.params;
    const strike = await StrikeService.leave(req.session.user, strikeId);
    if (!strike) {
      return res.send(APIResponse.throwError.NotFound());
    }
    return res.send(APIResponse.setData(strike));
  }, { req, res });
});

module.exports = router;

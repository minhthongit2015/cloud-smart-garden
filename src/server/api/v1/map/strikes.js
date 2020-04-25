const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const StrikeService = require('../../../services/map/StrikeService');
const MapSecurityService = require('../../../services/security/MapSecurity');


router.post('/join/:strikeId', Logger.catch(async (req, res) => {
  await MapSecurityService.onlyLoggedInUser(req);
  const { strikeId } = req.params;
  const strike = await StrikeService.join(req.session.user, strikeId);
  if (!strike) {
    return res.send(APIResponse.throwError.NotFound());
  }
  return res.send(APIResponse.setData(strike));
}));

router.post('/leave/:strikeId', Logger.catch(async (req, res) => {
  await MapSecurityService.onlyLoggedInUser(req);
  const { strikeId } = req.params;
  const strike = await StrikeService.leave(req.session.user, strikeId);
  if (!strike) {
    return res.send(APIResponse.throwError.NotFound());
  }
  return res.send(APIResponse.setData(strike));
}));

module.exports = router;

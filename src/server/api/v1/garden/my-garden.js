const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const SessionService = require('../../../services/user/Session');
const SecurityService = require('../../../services/security/SecurityService');
const GardenService = require('../../../services/garden/GardenServ');
const APIResponse = require('../../../models/api-models/APIResponse');


router.get('/', Logger.catch(async (req, res) => {
  const { user } = SessionService.getEntities(req);
  SecurityService.onlyLoggedInUser(req);
  const myGardens = await GardenService.getMyGardens(user);
  res.send(APIResponse.setData(myGardens));
}));

module.exports = router;

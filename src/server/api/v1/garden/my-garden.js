const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const SessionService = require('../../../services/user/Session');
// const SecurityService = require('../../../services/security/SecurityService');
const GardenService = require('../../../services/garden/GardenService');
const APIResponse = require('../../../models/api-models/APIResponse');


router.get('/', Logger.catch(async (req, res) => {
  const { user } = SessionService.getEntities(req);

  let myGardens = await GardenService.getMyGardens(user);
  if (!myGardens || !myGardens.length) {
    const minhThongUser = { _id: '000000000000000000000100' };
    myGardens = await GardenService.getMyGardens(minhThongUser);
  }

  res.send(APIResponse.setData(myGardens));
}));

module.exports = router;

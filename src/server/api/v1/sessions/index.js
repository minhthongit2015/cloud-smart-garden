
const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SessionService = require('../../../services/user/Session');


router.get('/', Logger.catch(async (req, res) => {
  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  // req.session.idz = req.sessionID; // Force save the created session to the database
  await new Promise(resolve => setTimeout(resolve, 1000));
  await SessionService.save(req.session);

  const HEADER_SIZE = 386;
  const size = +req.query.size - HEADER_SIZE;
  const payload = Buffer.from(new ArrayBuffer(Math.max(size, 0)));
  return res.send(payload.fill('1'));
  // return res.send(fullSessionId);
}));

module.exports = router;

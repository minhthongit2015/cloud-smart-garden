
const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SessionService = require('../../../services/user/Session');

router.get('/', Logger.catch((req, res) => {
  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  console.log('Generate session: ', req.sessionID);
  req.session.idz = req.sessionID; // Force save the created session to the database
  return res.send(fullSessionId);
}));

module.exports = router;

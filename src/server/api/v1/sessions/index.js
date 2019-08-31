
const router = require('express').Router();
const SessionService = require('../../../services/Session');

router.get('/', async (req, res) => {
  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  console.log('Generate session: ', req.sessionID);
  return res.send(fullSessionId);
});

module.exports = router;

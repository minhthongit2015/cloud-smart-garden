
const router = require('express').Router();
const SessionService = require('../../../services/Session');

router.get('/', async (req, res) => {
  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  res.send(fullSessionId);
});

module.exports = router;

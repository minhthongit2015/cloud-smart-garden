const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SyncService = require('../../../services/sync');
const PostService = require('../../../services/blog/PostServ');
const SessionService = require('../../../services/user/Session');

// WS
router.post('/verify', Logger.catch(async (req, res) => {
  const { _id: stationId } = req.body;
  if (!stationId) {
    return res.emit('unauthorized');
  }

  const station = await PostService.get(stationId);
  if (!station) {
    return res.emit('unauthorized');
  }

  const fullSessionId = SessionService.getFullSessionId(req.sessionID);
  req.session.station = station;
  return req.session.save(() => res.emit('authorized', encodeURIComponent(fullSessionId)));
}));

router.post('/set-state', Logger.catch(async (req, res) => {
  SyncService.broadcast(req.socket, 'command', req.body);
  res.end();
}));

module.exports = router;

const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SyncService = require('../../../services/sync');
const PostService = require('../../../services/blog/Post');
const SessionService = require('../../../services/user/Session');

// WS
router.post('/verify', (req, res) => {
  Logger.catch(async () => {
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
    return req.session.save(() => res.emit('accept', fullSessionId));
  }, { req, res });
});

router.post('/set-state', (req, res) => {
  Logger.catch(async () => {
    SyncService.broadcast(req.socket, 'command', req.body);
    res.end();
  }, { req, res });
});

module.exports = router;

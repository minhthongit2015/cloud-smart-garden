const DebugLib = require('debug');
const router = require('../../router')();
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.ws('/info/:gardenId', async (req, res) => {
  const { gardenId } = req.params;
  const { type } = req.query;
  debug('garden route', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  res.send({ msg: 'update garden info', type, gardenId });
});

router.ws('/device', async (req, res) => {
  debug('garden list', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  res.send('garden list');
});

module.exports = router;

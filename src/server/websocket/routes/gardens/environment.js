const DebugLib = require('debug');
const router = require('../../router')();
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.post('/', async (req, res) => {
  debug('Post environemt: ', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  // TODO:
  // - phát sự kiện đến mobile người dùng quản lý vườn
  // - phát sự kiện đến web người dùng
  res.send('got it');
});

module.exports = router;

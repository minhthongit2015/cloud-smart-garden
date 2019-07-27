const DebugLib = require('debug');
const router = require('../../router')();
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.post('/:userId', async (req, res) => {
  debug('user route', req.session.user);
  // TODO:
  // - gửi yêu cầu cuộc gọi tới duy nhất userId
  res.send('got it');
});

router.post('/:userId/signal', async (req, res) => {
  debug('user route', req.session.user);
  // TODO:
  // - Gửi signal từ user hiện tại tới duy nhất userId
  res.send('got it');
});

router.post('/list', async (req, res) => {
  debug('user list', req.session.user);
  res.send('garden list');
});

module.exports = router;

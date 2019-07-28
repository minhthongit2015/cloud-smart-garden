
const colors = require('colors');
const DebugLib = require('debug');
const { Debug } = require('../../../utils/constants');
const router = require('../../router')();

const debug = DebugLib(Debug.ws.ROUTING);

router.post('/:userId', async (req, res) => {
  debug(colors.bgYellow(' POST '), '/user/:userId', req.session.user);
  // TODO:
  // - gửi yêu cầu cuộc gọi tới duy nhất userId
  res.send('got it');
});

router.post('/:userId?\\d+/signal', async (req, res) => {
  debug(colors.bgYellow(' POST '), '/user/:userId/signal', req.session.user);
  // TODO:
  // - Gửi signal từ user hiện tại tới duy nhất userId
  res.send('got it');
});

router.post('/list', async (req, res) => {
  debug(colors.bgYellow(' POST '), '/user/list', req.session.user);
  res.send('garden list');
});

module.exports = router;

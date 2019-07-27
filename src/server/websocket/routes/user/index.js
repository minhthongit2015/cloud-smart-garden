const DebugLib = require('debug');
const router = require('../../router')();
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.get('/', async (req, res) => {
  debug('user route', req.session.user);
  res.send('got it');
});

router.post('/list', async (req, res) => {
  debug('user list', req.session.user);
  res.send('garden list');
});

module.exports = router;

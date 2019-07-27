const DebugLib = require('debug');
const router = require('../../router')();
const updateRoute = require('./update-garden');
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.get('/', async (req, res) => {
  debug('get garden: ', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  res.send('got it');
});

router.post('/list', async (req, res) => {
  debug('garden list', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  res.send('garden list');
});

router.ws('/data', async (req, res) => {
  debug('garden data', req.session.user ? req.session.user.username || req.session.user : '');
  res.send('cloud data');
});

router.use('/update', updateRoute);

module.exports = router;

const DebugHelper = require('debug');
const router = require('../../../router')();
const { Debug } = require('../../../../utils/constants');

const debug = DebugHelper(Debug.ws.ROUTING);

router.post('/state', async (req, res) => {
  debug('Station state: ', req.sessionID,
    req.session.user ? req.session.user.username || req.session.user : '');
  // console.log(req.body);
});

module.exports = router;

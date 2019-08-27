const DebugHelper = require('debug');
const { Debug } = require('../../utils/constants');
const gardensRouter = require('./gardens');
const router = require('../router')();

const debug = DebugHelper(Debug.ws.ROUTING);

router.ws('message', async (req, res) => {
  debug('message: %d (length)', req.body.length);
  res.send(`echo "${req.body}"`);
});

router.use('/gardens', gardensRouter);


module.exports = router;

const router = require('express').Router();
const DebugHelper = require('debug');
const { Debug } = require('../../utils/constants');
const gardensRouter = require('./gardens');

const debug = DebugHelper(Debug.ws.ROUTING);

router.head('message', async (req, res) => {
  debug('message: %d (length)', req.body.length);
  res.send(`echo "${req.body}"`);
});

router.use('/gardens', gardensRouter);


module.exports = router;

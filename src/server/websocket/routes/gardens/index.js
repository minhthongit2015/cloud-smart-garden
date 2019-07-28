const DebugLib = require('debug');
const router = require('../../router')();
const equipsRoute = require('./equips');
const { Debug } = require('../../../utils/constants');

const debug = DebugLib(Debug.ws.ROUTING);

router.use('/equips', equipsRoute);

router.get('/:gardenId', async (req, res) => {
  debug(req.pathname);
  res.send(req.pathname);
});

router.get('/list', async (req, res) => {
  const { limit, offset } = req.query;
  debug(req.pathname);
  res.send(req.pathname, limit, offset);
});

router.post('/:gardenId', async (req, res) => {
  const { gardenId } = req.params;
  debug(req.pathname);
  res.send(req.pathname, gardenId);
});

module.exports = router;

const DebugHelper = require('debug');
const router = require('../../router')();
const { Debug } = require('../../../utils/constants');

const debug = DebugHelper(Debug.ws.ROUTING);

router.get('/', async (req, res) => {
  const { gardenId } = req.params;
  const { type } = req.query;
  debug(req.pathname);
  res.send({ msg: 'update garden info', type, gardenId });
});

router.get('/:eqipId', async (req, res) => {
  const { gardenId } = req.params;
  const { type } = req.query;
  debug(req.pathname);
  res.send({ msg: 'update garden info', type, gardenId });
});

router.post('/:equipId', async (req, res) => {
  const { gardenId } = req.params;
  debug(req.pathname, gardenId);
  res.send('garden list');
});

module.exports = router;

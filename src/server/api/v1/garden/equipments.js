const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');

router.get('/', Logger.catch((req, res) => {
  const { gardenId } = req.params;
  const { type } = req.query;
  res.send({ msg: 'update garden info', type, gardenId });
}));

router.get('/:eqipId', Logger.catch((req, res) => {
  const { gardenId } = req.params;
  const { type } = req.query;
  res.send({ msg: 'update garden info', type, gardenId });
}));

router.post('/:equipId', Logger.catch((req, res) => {
  // const { gardenId } = req.params;
  res.send('garden list');
}));

module.exports = router;

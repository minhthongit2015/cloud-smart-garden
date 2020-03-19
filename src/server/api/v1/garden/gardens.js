const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');


router.get('/:gardenId', Logger.catch((req, res) => {
  res.send(req.pathname);
}));

router.get('/list', Logger.catch((req, res) => {
  const { limit, offset } = req.query;
  res.send(req.pathname, limit, offset);
}));

router.post('/:gardenId', Logger.catch((req, res) => {
  const { gardenId } = req.params;
  res.send(req.pathname, gardenId);
}));

module.exports = router;

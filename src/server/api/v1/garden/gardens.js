const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');

router.get('/:gardenId', (req, res) => {
  Logger.catch(async () => {
    res.send(req.pathname);
  });
});

router.get('/list', (req, res) => {
  Logger.catch(async () => {
    const { limit, offset } = req.query;
    res.send(req.pathname, limit, offset);
  });
});

router.post('/:gardenId', (req, res) => {
  Logger.catch(async () => {
    const { gardenId } = req.params;
    res.send(req.pathname, gardenId);
  });
});

module.exports = router;

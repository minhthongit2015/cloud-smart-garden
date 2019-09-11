const router = require('express').Router();
const V1Route = require('./v1');
const Debugger = require('../services/Debugger');

router.use((req, res, next) => {
  req.api = true;
  if (req.websocket) {
    Debugger.wsRouting(req.path);
  } else {
    Debugger.apiRouting(req.path);
  }
  next();
});

router.use('/v1', V1Route);

router.use((req, res) => {
  res.status(404).send('API Not Found!');
});

module.exports = router;

const router = require('express').Router();
const V1Route = require('./v1');
const Debugger = require('../services/Debugger');
const APIResponse = require('../models/api-models');

router.use((req, res, next) => {
  req.api = true;
  const route = `${Debugger.colors.green(req.method)} ${req.path}`;
  if (req.websocket) {
    Debugger.wsRouting(route);
  } else {
    Debugger.apiRouting(route);
  }
  next();
});

router.use('/v1', V1Route);

router.use((req, res) => {
  res.status(404).send(new APIResponse().setErrorMessage('API Not Found!'));
});

module.exports = router;

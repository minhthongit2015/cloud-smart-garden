const router = require('express').Router();
const Debugger = require('../../services/Debugger');

const ServerStatusRoute = require('./api-info');
const ApiInfoRoute = require('./api-info');
const SessionsRoute = require('./sessions');
const MapRoute = require('./map');
const UsersRoute = require('./users');
const GardensRouter = require('./gardens');
const AICentralRoute = require('./ai-central');

router.use((req, res, next) => {
  if (req.websocket) {
    Debugger.wsRouting(req.path);
  } else {
    Debugger.apiRouting(req.path);
  }
  next();
});

router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/sessions', SessionsRoute);

router.use('/users', UsersRoute);
router.use('/map', MapRoute);
router.use('/gardens', GardensRouter);
router.use('/ai-central', AICentralRoute);

module.exports = router;

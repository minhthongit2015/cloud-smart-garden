const router = require('express').Router();
const ServerStatusRoute = require('./api-info');
const ApiInfoRoute = require('./api-info');
const SessionRoute = require('./session');
const UserRoute = require('./user');
const MapRoute = require('./map');

router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/session', SessionRoute);
router.use('/user', UserRoute);
router.use('/map', MapRoute);

module.exports = router;

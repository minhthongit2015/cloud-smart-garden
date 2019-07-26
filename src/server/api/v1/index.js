const router = require('express').Router();
const ServerStatusRoute = require('./api-info');
const ApiInfoRoute = require('./api-info');
const UserRoute = require('./user');

router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/user', UserRoute);

module.exports = router;

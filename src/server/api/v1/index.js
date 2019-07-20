const router = require('express').Router();
const InfoRoute = require('./api-info');
const UserRoute = require('./user');

router.use('/api-info', InfoRoute);
router.use('/user', UserRoute);

module.exports = router;

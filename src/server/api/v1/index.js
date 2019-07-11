const router = require('express').Router();
const InfoRoute = require('./info');

router.use('/info', InfoRoute);

module.exports = router;

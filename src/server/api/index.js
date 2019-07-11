const router = require('express').Router();
const V1Route = require('./v1');

router.use('/v1', V1Route);

module.exports = router;

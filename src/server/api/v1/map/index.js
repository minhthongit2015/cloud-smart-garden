const router = require('express').Router();
const ObjectsRoute = require('./objects');

router.use('/objects', ObjectsRoute);

module.exports = router;

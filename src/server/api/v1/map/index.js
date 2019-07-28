const router = require('express').Router();
const ObjectsRoute = require('./entities');

router.use('/entities', ObjectsRoute);

module.exports = router;

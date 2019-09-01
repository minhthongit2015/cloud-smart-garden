const router = require('express').Router();
const DatasetsRoute = require('./datasets');

router.use('/datasets', DatasetsRoute);

module.exports = router;

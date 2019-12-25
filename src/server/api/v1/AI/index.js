const router = require('express').Router();
const DatasetsRoute = require('./datasets');
const ExperimentsRoute = require('./experiments');

router.use('/datasets', DatasetsRoute);
router.use('/experiments', ExperimentsRoute);

module.exports = router;

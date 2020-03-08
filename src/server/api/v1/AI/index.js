const router = require('express').Router();
const DatasetsRoute = require('./datasets');
const ExperimentsRoute = require('./experiments');
const TrainedModelsRoute = require('./trained-models');

router.use('/datasets', DatasetsRoute);
router.use('/experiments', ExperimentsRoute);
router.use('/trained-models', TrainedModelsRoute);

module.exports = router;

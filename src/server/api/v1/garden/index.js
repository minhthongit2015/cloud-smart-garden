const router = require('express').Router();
const GardensRoute = require('./gardens');
const MyGardenRoute = require('./my-garden');
const StationsRoute = require('./stations');
const RecordsRoute = require('./records');
const EquipmentsRoute = require('./equipments');

router.use('/gardens', GardensRoute);
router.use('/my-garden', MyGardenRoute);
router.use('/stations', StationsRoute);
router.use('/records', RecordsRoute);
router.use('/equipments', EquipmentsRoute);

module.exports = router;

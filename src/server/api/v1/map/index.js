const router = require('express').Router();
const PlacesRoute = require('./places');
const StrikesRoute = require('./strikes');

router.use('/places', PlacesRoute);
router.use('/strikes', StrikesRoute);

module.exports = router;

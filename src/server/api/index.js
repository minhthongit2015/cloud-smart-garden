const router = require('express').Router();
const EnvironmentRoute = require('./environment');
const AuthRoute = require('./auth');
const GardenRoute = require('./garden');
const AIMLRoute = require('./AI-ML');

router.get('/', async (req, res) => {
  res.send('hello API');
});

router.use('/environment', EnvironmentRoute);
router.use('/auth', AuthRoute);
router.use('/garden', GardenRoute);
router.use('/AI-ML', AIMLRoute);

module.exports = router;

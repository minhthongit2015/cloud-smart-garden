const router = require('express').Router();
const EnvironmentRoute = require('./environment');
const AuthenticationRoute = require('./auth');

router.get('/', async (req, res) => {
  res.send('hello API');
});

router.use('/environment', EnvironmentRoute);
router.use('/auth', AuthenticationRoute);

module.exports = router;

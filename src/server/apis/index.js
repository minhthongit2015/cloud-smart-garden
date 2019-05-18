const router = require('express').Router();
const EnvironmentRouter = require('./environment');

router.get('/', async (req, res) => {
  res.send('hello API');
});

router.use('/environment', EnvironmentRouter);

module.exports = router;

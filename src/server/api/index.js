const router = require('express').Router();
const V1Route = require('./v1');

router.use('/v1', V1Route);

router.use((req, res) => {
  res.status(404).send('API Not Found!');
});

module.exports = router;

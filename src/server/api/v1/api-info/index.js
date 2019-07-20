const router = require('express').Router();

router.get('/', async (req, res) => {
  req.dump = req + res;
  // TODO: return server information
});

router.get('/', async (req, res) => {
  req.dump = req + res;
});

module.exports = router;

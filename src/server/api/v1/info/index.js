const router = require('express').Router();


router.get('/', async (req, res) => {
  req.dump = req + res;
  res.send(req.session.id);
  // TODO: return server information
});

router.post('/', async (req, res) => {
  req.dump = req + res;
});

module.exports = router;

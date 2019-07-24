const router = require('../../router')();

router.ws('/info', async (req, res) => {
  console.log('garden route', req.session.user);
  res.send('got it');
});

router.ws('/device', async (req, res) => {
  console.log('garden list', req.session.user);
  res.send('garden list');
});

module.exports = router;

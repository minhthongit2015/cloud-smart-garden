const router = require('../../router')();

router.get('/', async (req, res) => {
  console.log('garden route', req.session.user);
  res.send('got it');
});

router.post('/list', async (req, res) => {
  console.log('garden list', req.session.user);
  res.send('garden list');
});

module.exports = router;

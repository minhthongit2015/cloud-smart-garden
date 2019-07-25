const router = require('../../router')();
const updateRoute = require('./update-garden');

router.get('/', async (req, res) => {
  console.log('garden route', req.session.user);
  res.send('got it');
});

router.post('/list', async (req, res) => {
  console.log('garden list', req.session.user);
  res.send('garden list');
});

router.ws('/data', async (req, res) => {
  console.log('garden data', req.session.user);
  req.session.user += 1;
  res.send('cloud data');
});

router.use('/update', updateRoute);

module.exports = router;

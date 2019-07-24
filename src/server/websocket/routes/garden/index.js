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

router.use('/update', updateRoute);

module.exports = router;

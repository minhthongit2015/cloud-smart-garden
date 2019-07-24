const router = require('../router')();
const gardenRouter = require('./garden');

router.ws('message', async (req, res) => {
  console.log('onmessage', req.data);
  res.send('hello back');
});

router.use('/garden', gardenRouter);


module.exports = router;

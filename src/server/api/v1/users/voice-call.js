
const router = require('express').router();

router.post('/:userId', async (req, res) => {
  // TODO:
  // - gửi yêu cầu cuộc gọi tới duy nhất userId
  res.send('got it');
});

router.post('/:userId?\\d+/signal', async (req, res) => {
  // TODO:
  // - Gửi signal từ user hiện tại tới duy nhất userId
  res.send('got it');
});

router.post('/list', async (req, res) => {
  res.send('garden list');
});

module.exports = router;

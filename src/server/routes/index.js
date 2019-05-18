const router = require('express').Router();
const path = require('path');

router.get('*', async (req, res) => {
  const indexPath = path.resolve('dist/index.html');
  res.sendFile(indexPath);
});

module.exports = router;

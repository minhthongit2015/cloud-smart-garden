const router = require('express').Router();
const path = require('path');
const serverConfig = require('../config');

router.get('*', async (req, res) => {
  console.log('route access', req.sessionID, req.session.user);
  req.session.user += 1;
  const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
  res.sendFile(indexPath);
});

module.exports = router;

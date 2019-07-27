const router = require('express').Router();
const path = require('path');
const DebugLib = require('debug');
const serverConfig = require('../config');
const { Debug } = require('../utils/constants');

const debug = DebugLib(Debug.ROUTING);

router.get('*', async (req, res) => {
  debug('Route access: ', req.sessionID,
    (req.session && req.session.user) ? req.session.user.username || req.session.user : '');
  const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
  res.sendFile(indexPath);
});

module.exports = router;

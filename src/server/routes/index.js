const router = require('express').Router();
const path = require('path');
const Debugger = require('../services/Debugger');
const Logger = require('../services/Logger');
const serverConfig = require('../config');

router.get('*', (req, res) => {
  Logger.catch(() => {
    Debugger.httpRouting('Route access: ', req.sessionID,
      (req.session && req.session.user) ? req.session.user.username || req.session.user : '');
    const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
    res.sendFile(indexPath);
  });
});

module.exports = router;

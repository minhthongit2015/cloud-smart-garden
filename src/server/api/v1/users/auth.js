const router = require('express').Router();
const APIResponse = require('../../../models/api-models/APIResponse');
const Logger = require('../../../services/Logger');

router.get('/facebook', (req, res) => {
  Logger.catch(() => res.send(
    APIResponse.setData(req.session.user || null)
  ), { req, res });
});

module.exports = router;

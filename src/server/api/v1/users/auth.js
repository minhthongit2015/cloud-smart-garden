const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

router.get('/facebook', (req, res) => {
  Logger.catch(() => res.send(
    new APIResponse().setData(req.session.user || null)
  ));
});

module.exports = router;

const router = require('express').Router();
const APIResponse = require('../../../models/api-models/APIResponse');
const Logger = require('../../../services/Logger');

router.get('/facebook', Logger.catch((req, res) => {
  res.send(APIResponse.setData(req.session.user || null));
}));

module.exports = router;

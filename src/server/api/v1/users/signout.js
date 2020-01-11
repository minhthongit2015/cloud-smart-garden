const router = require('express').Router();
const APIResponse = require('../../../models/api-models/APIResponse');
const Logger = require('../../../services/Logger');

router.get('/', Logger.catch(async (req, res) => {
  delete req.session.user;
  delete req.session.fbUser;
  await new Promise(resolve => req.session.save(resolve));
  return res.send(new APIResponse().success());
}));

module.exports = router;

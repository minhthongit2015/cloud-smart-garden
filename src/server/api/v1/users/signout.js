const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

router.get('/', (req, res) => {
  Logger.catch(async () => {
    delete req.session.user;
    delete req.session.fbUser;
    await new Promise(resolve => req.session.save(resolve));
    return res.send(new APIResponse().success());
  }, { req, res });
});

module.exports = router;

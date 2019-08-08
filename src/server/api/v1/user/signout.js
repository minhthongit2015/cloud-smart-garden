const router = require('express').Router();
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

router.get('/', async (req, res) => {
  try {
    delete req.session.user;
    await new Promise(resolve => req.session.save(resolve));
    return res.send(new APIResponse().success());
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;

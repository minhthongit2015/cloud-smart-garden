const router = require('express').Router();
const AuthService = require('../../../services/deprecated-authenticator');
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

const { isNone, isBlank } = require('../../../utils');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (isBlank(username) || isBlank(password)) {
      return res.send(new APIResponse().setErrorMessage('Invalid username or password'));
    }

    const sessionUser = req.session.user;
    const user = await AuthService.authenticate(username, password) || sessionUser;
    if (!isNone(user)) {
      req.session.user = user;
      return req.session.save(() => {
        res.send({ user });
      });
    }
    return res.send(new APIResponse());
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.send(new APIResponse({ error: { message: error.message, stack: error.stack } }));
  }
});

module.exports = router;

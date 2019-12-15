const router = require('express').Router();
const AuthService = require('../../../services/user/Auth');
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

const { isNone, isBlank } = require('../../../utils');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isBlank(email) || isBlank(password)) {
      return res.status(401).send(new APIResponse().setError('Invalid email or password'));
    }

    const user = await AuthService.authenticate(email, password);
    if (isNone(user)) {
      return res.status(401).send(new APIResponse().setError('Wrong email or password'));
    }

    req.session.user = user;
    await new Promise(resolve => req.session.save(resolve));
    return res.send(new APIResponse().setData({ user }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;

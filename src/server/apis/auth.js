
const router = require('express').Router();
const AuthenticateService = require('../services/authenticator');

router.post('/login', async (req, res) => {
  const { username, password, accessToken } = req.body;
  const user = await AuthenticateService.authenticate(username, password, accessToken);
  res.send({user});
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthenticateService.authenticate(username, password);
  res.send({user});
});

module.exports = router;

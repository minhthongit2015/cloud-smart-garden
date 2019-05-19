
const router = require('express').Router();
const AuthService = require('../services/authenticator');

router.post('/login', async (req, res) => {
  const { username, password, accessToken } = req.body;
  const sessionUser = req.session.user;
  const user = sessionUser || await AuthService.authenticate(username, password, accessToken || req.sessionID);
  if (user) {
    req.session.user = user;
    return req.session.save(() => {
      res.send({user});
    });
  }
  return res.send({user});
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthService.authenticate(username, password);
  res.send({user});
});

module.exports = router;

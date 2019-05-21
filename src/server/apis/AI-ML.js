
const router = require('express').Router();
const AuthService = require('../services/authenticator');
const AIMLService = require('../services/AI-ML');

router.get('/test', async (req, res) => {
  const result = await AIMLService.test();
  const output = await result[2].data();
  return res.send(output);
});

module.exports = router;

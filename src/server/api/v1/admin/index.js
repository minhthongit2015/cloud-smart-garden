const router = require('express').Router();
const Logger = require('../../../services/Logger');
// const APIResponse = require('../../../models/api-models/APIResponse');
const GoogleService = require('../../../services/third-party/google/Google');
const ImgUrService = require('../../../services/third-party/imgur');

router.get('/google/auth', Logger.catch((req, res) => {
  const { code } = req.query;
  if (!code) {
    const authUrl = GoogleService.oauth2();
    res.redirect(authUrl);
  } else {
    GoogleService.saveTokenFromCode(code);
    res.redirect('/');
  }
}));

router.get('/google/test', Logger.catch(async () => {
  GoogleService.test();
}));

router.get('/imgurl/auth', Logger.catch(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    const authUrl = ImgUrService.oauth2();
    res.redirect(authUrl);
  } else {
    ImgUrService.saveTokenFromCode(code);
    res.redirect('/');
  }
}));


module.exports = router;

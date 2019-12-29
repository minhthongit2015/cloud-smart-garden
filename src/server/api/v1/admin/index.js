const router = require('express').Router();
const Logger = require('../../../services/Logger');
// const APIResponse = require('../../../models/api-models/APIResponse');
const GoogleService = require('../../../services/third-party/google/Google');
const ImgUrService = require('../../../services/third-party/imgur');

router.get('/google/auth', (req, res) => {
  Logger.catch(async () => {
    const { code } = req.query;
    if (!code) {
      const authUrl = GoogleService.oauth2();
      res.redirect(authUrl);
    } else {
      GoogleService.saveTokenFromCode(code);
      res.redirect('/');
    }
  }, { req, res });
});

router.get('/google/test', (req, res) => {
  Logger.catch(async () => {
    GoogleService.test();
  }, { req, res });
});

router.get('/imgurl/auth', (req, res) => {
  Logger.catch(async () => {
    const { code } = req.query;
    if (!code) {
      const authUrl = ImgUrService.oauth2();
      res.redirect(authUrl);
    } else {
      ImgUrService.saveTokenFromCode(code);
      res.redirect('/');
    }
  }, { req, res });
});


module.exports = router;

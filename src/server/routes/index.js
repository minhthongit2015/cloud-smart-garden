const router = require('express').Router();
// const path = require('path');
const Debugger = require('../services/Debugger');
const Logger = require('../services/Logger');
// const serverConfig = require('../config');
const PostService = require('../services/blog/Post');
const PlaceService = require('../services/map/Place');
const {
  buildModel, getModel, getModelByPost, getModelByPlace
} = require('../views/ViewUtils');
const getTitleByUrl = require('./CategoryTitleMap');

router.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

router.get('*', (req, res) => {
  Logger.catch(async () => {
    Debugger.httpRouting('Routing: ', req.sessionID,
      (req.session && req.session.user) ? req.session.user.name : '');

    // const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
    // res.sendFile(indexPath);

    let model = getModel();
    // const port = req.connection.localPort !== 80
    //   ? `:${req.connection.localPort}`
    //   : '';
    model.url = `https://${req.hostname}${req.url}`;
    if (req.query && req.query.hashtag) {
      const post = await PostService.getByOrder(req.query.hashtag);
      if (!post) {
        return res.redirect('/');
      }
      model = getModelByPost(post, model);
      return res.render('index', model);
    }

    if (req.query.place) {
      const place = await PlaceService.getByOrder(req.query.place);
      if (!place) {
        return res.redirect('/');
      }
      model = getModelByPlace(place, model);
      return res.render('index', model);
    }

    const titleByCategory = getTitleByUrl(req.path);
    model = buildModel({
      ...model,
      title: titleByCategory ? `${titleByCategory} | ${model.title}` : model.title
    });
    return res.render('index', model);
  }, () => {
    res.redirect('/');
  });
});

module.exports = router;

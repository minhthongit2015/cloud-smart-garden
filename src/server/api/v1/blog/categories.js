const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const CategoryService = require('../../../services/blog/Category');
const APIResponse = require('../../../models/api-models');
const ImgurService = require('../../../services/third-party/imgur');
const SecurityService = require('../../../services/security');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    SecurityService.onlyModOrAdmin(req);
    const { preview } = req.body;
    const album = await ImgurService.createAlbum();
    const img = await ImgurService.create(preview, album.body.data.deletehash);
    if (img && true) {
      return res.send('ok');
    }
    const post = await CategoryService.create(req.body);
    return res.send(new APIResponse().setData(post));
  }, { req, res });
});

router.get('/:categoryId?', (req, res) => {
  Logger.catch(async () => {
    const { categoryId } = req.params;
    const categoryOrCategories = await CategoryService.getOrList(categoryId, req.query);
    return res.send(new APIResponse().setData(categoryOrCategories));
  }, { req, res });
});

router.delete('/:categoryId', (req, res) => {
  Logger.catch(async () => {
    SecurityService.onlyModOrAdmin(req);
    const { categoryId } = req.params;
    const deleteResult = await CategoryService.delete(categoryId);
    return res.send(new APIResponse().setData(deleteResult));
  }, { req, res });
});

module.exports = router;

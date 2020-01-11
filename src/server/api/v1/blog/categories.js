const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const CategoryService = require('../../../services/blog/Category');
const APIResponse = require('../../../models/api-models/APIResponse');
const ImgurService = require('../../../services/third-party/imgur');
const SecurityService = require('../../../services/security/SecurityService');


router.post('/', Logger.catch(async (req, res) => {
  SecurityService.onlyModOrAdmin(req);
  const { preview } = req.body;
  const album = await ImgurService.createAlbum();
  const img = await ImgurService.create(preview, album.body.data.deletehash);
  if (img && true) {
    return res.send('ok');
  }
  const post = await CategoryService.create(req.body);
  return res.send(APIResponse.setData(post));
}));

router.get('/:categoryId?', Logger.catch(async (req, res) => {
  const { categoryId } = req.params;
  const categoryOrCategories = await CategoryService.getOrList(categoryId, req.query);
  return res.send(APIResponse.setData(categoryOrCategories));
}));

router.delete('/:categoryId', Logger.catch(async (req, res) => {
  SecurityService.onlyModOrAdmin(req);
  const { categoryId } = req.params;
  const deleteResult = await CategoryService.delete(categoryId);
  return res.send(APIResponse.setData(deleteResult));
}));

module.exports = router;

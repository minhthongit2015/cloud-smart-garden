const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const CategoryService = require('../../../services/social/CategoryService');
const APIResponse = require('../../../models/api-models/APIResponse');
const ImgurService = require('../../../services/third-party/imgur');
const SecurityService = require('../../../services/security/SecurityService');


router.post('/', Logger.catch(async (req, res) => {
  SecurityService.onlyModOrAdmin(req);
  const { previewPhoto } = req.body;
  const album = await ImgurService.createAlbum();
  const img = await ImgurService.create(previewPhoto, album.body.data.deletehash);
  if (img && true) {
    return res.send('ok');
  }
  const post = await CategoryService.create(req.body);
  return res.send(APIResponse.setData(post));
}));

router.get('/:categoryId?', Logger.catch(async (req, res) => {
  const { categoryId } = req.params;
  const categories = await CategoryService.getOrList({ id: categoryId, opts: req.query });
  return res.send(APIResponse.setData(categories));
}));

router.delete('/:categoryId', Logger.catch(async (req, res) => {
  SecurityService.onlyModOrAdmin(req);
  const { categoryId } = req.params;
  const deletedCategory = await CategoryService.delete({ id: categoryId });
  return res.send(APIResponse.setData(deletedCategory));
}));

module.exports = router;

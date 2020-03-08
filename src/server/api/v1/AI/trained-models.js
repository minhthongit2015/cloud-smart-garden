const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
// const SecurityService = require('../../../services/security/SecurityService');
// const SessionService = require('../../../services/user/Session');
const TrainedModelService = require('../../../services/AI/ModelServ');


router.post('/', Logger.catch(async (req, res) => {
  const post = PostsSecurityService.filterUnallowedProperties(req.body);
  await PostsSecurityService.onlyOwnerModAdmin(req, post);
  post.newAuthor = req.session.user;
  post.owner = req.session.user;
  const newTrainedModel = await TrainedModelService.createOrUpdate(post);
  // await SessionService.checkForDirtySession(req);
  res.send(new APIResponse().setData(newTrainedModel));
}));

router.post('/overwrite', Logger.catch(async (req, res) => {
  const { experiment, target } = req.body;
  const newTrainedModel = await TrainedModelService.syncModelFromExperiment(experiment, target);
  res.send(new APIResponse().setData(newTrainedModel));
}));

module.exports = router;

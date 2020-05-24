const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
// const SocialSecurityService = require('../../../services/security/SocialSecurityService');
// const SessionService = require('../../../services/user/Session');
const TrainedModelService = require('../../../services/AI/ModelService');

router.post('/', Logger.catch(async (req, res) => {
  const { session: { user }, body: doc } = req;
  const newTrainedModel = await TrainedModelService.createOrUpdate({ user, doc });
  return res.send(APIResponse.setData(newTrainedModel));
}));

router.post('/override', Logger.catch(async (req, res) => {
  const { experiment, target } = req.body;
  const newTrainedModel = await TrainedModelService.syncModelFromTemporary(experiment, target);
  res.send(APIResponse.setData(newTrainedModel));
}));

module.exports = router;

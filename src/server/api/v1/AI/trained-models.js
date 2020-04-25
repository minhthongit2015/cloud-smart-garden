const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
// const SocialSecurityService = require('../../../services/security/SocialSecurityService');
// const SessionService = require('../../../services/user/Session');
const TrainedModelService = require('../../../services/AI/ModelService');


router.post('/override', Logger.catch(async (req, res) => {
  const { experiment, target } = req.body;
  const newTrainedModel = await TrainedModelService.syncModelFromExperiment(experiment, target);
  res.send(APIResponse.setData(newTrainedModel));
}));

module.exports = router;

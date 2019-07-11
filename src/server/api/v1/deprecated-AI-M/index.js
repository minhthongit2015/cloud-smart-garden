
const router = require('express').Router();
// const AuthService = require('../services/authenticator');
const AIMLService = require('../../services/AI-ML');
const AIMLManager = require('../../services/AI-ML/manager');
const WSManager = require('../../websocket/ws-manager');

router.get('/train', async (req, res) => {
  const result = await AIMLService.test({
    onBatchEnd: (batch, logs) => {
      WSManager.io.emit('train-progress', logs);
    }
  });
  const output = result.trainHistory;
  const saveResult = await result.model.save(`file://${AIMLManager.modelsPath}/ppm`, );
  return res.send({output, saveResult});
});

router.get('/check-update', async (req, res) => {
  const versionsByType = AIMLManager.listVersions();
  res.send({ versions: versionsByType });
});

router.get('/download/:model/:version?', async (req, res) => {
  const { model, version } = req.params;
  if (!model) return res.status(400).send('Model name must be specified');
  const versionsByType = AIMLManager.listVersions();
  const isValidVersion = versionsByType[model] && versionsByType[model].includes(version);
  const latestVersion = versionsByType[model][0];
  const validVersion = isValidVersion ? version : latestVersion;
  const modelPath = `${AIMLManager.modelsPath}/${model}/${model}@${validVersion}/model.json`;
  const modelWeightPath = `${AIMLManager.modelsPath}/${model}/${model}@${validVersion}/weights.bin`;
  if (!validVersion) {
    return res.status(404).send('Model has no version');
  }
  return res.zip({
    files: [
      { path: modelPath, name: 'model.json' },
      { path: modelWeightPath, name: 'weights.bin' }
    ],
    filename: `${model}@${validVersion}.zip`
  });
});

module.exports = router;

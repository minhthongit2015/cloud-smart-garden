
const router = require('express').Router();
// const AuthService = require('../services/authenticator');
// const AIMLService = require('../../services/AI-ML');
const AIMLManager = require('../../services/AI-ML/manager');

router.get('/export/:gardenId/:stationId', async (req, res) => {
  const { deviceId } = req.params;
  const { viewMode, time } = req.query;
  const file = await AIMLManager.generateRecordsFile(deviceId, viewMode, time);
  res.send(file);
});

router.put('/import/:gardenId/:stationId', async (req, res) => {
  const { deviceId } = req.params;
  if (req.files.length <= 0) res.send('none');
  const files =
    req.files.filedata.length > 0 ? req.files.filedata : [req.files.filedata];
  const rs = await AIMLManager.importRecordFiles(files, deviceId);
  res.send(JSON.stringify((rs ? rs.map(r => r.result) : rs) || 'OK'));
});

module.exports = router;
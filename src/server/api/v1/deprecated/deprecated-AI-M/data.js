
const router = require('express').Router();
// const AuthService = require('../services/authenticator');
// const AIMLService = require('../../services/AI-ML');
const Utils = require('../../utils');
const AIMLManager = require('../../../services/AI-ML/manager');
const { Environment } = require('../../../../models/mongo');

const { isBlank } = Utils;

router.get('/create', async (req, res) => {
  const { deviceId, time, value } = req.query;
  const result = await PowerService.create({
    device: deviceId,
    x: parseInt(time, 10),
    y: parseFloat(value)
  });
  res.send(result);
});

router.get('/generate/:deviceId?', async (req, res) => {
  const { deviceId } = req.params;
  const size = parseInt(req.query.size, 10);
  const records = await PowerService.generate(size, deviceId);
  res.send(records);
});

router.get('/remove/:deviceId?', async (req, res) => {
  const { deviceId } = req.params;
  const records = await PowerService.removeAll(deviceId);
  res.send(records);
});

router.get('/export/:gardenId/:stationId', async (req, res) => {
  const { deviceId } = req.params;
  const { viewMode, time } = req.query;
  const file = await AIMLManager.generateRecordsFile(deviceId, viewMode, time);
  res.send(file);
});

router.put('/import/:gardenId/:stationId', async (req, res) => {
  const { deviceId } = req.params;
  if (req.files.length <= 0) res.send('none');
  const files = req.files.filedata.length > 0 ? req.files.filedata : [req.files.filedata];
  const rs = await AIMLManager.importRecordFiles(files, deviceId);
  res.send(JSON.stringify((rs ? rs.map(r => r.result) : rs) || 'OK'));
});

router.get('/:gardenId/:stationId', async (req, res) => {
  const { gardenId, stationId } = req.params;
  const { viewMode, time } = req.query;
  const records = await Environment.get({
    gardenId, stationId
  });
  res.send(records);
});

module.exports = router;


const router = require('express').Router();
const AuthService = require('../../services/authenticator');
const GardenInfoService = require('../../services/garden');
const WebsocketManager = require('../../websocket/ws-manager');

router.get('/list', async (req, res) => {
  const { username, password, token } = req.headers;
  const user = await AuthService.authenticate(username, password, token);
  if (!user) {
    return res.send([]);
  }
  const gardens = await GardenInfoService.getGardensByOwner(user.id);
  return res.send(gardens);
});

router.get('/request-access/:gardenId', async (req, res) => {
  const { token } = req.headers;
  const { gardenId } = req.params;
  const user = await AuthService.authenticateByToken(token);
  if (!user) {
    return res.send({ isAccessible: false, isOnline: null });
  }
  const garden = await GardenInfoService.getById(gardenId);
  if (!garden) {
    return res.send({ isAccessible: false, isOnline: null });
  }
  const isOnline = WebsocketManager.clientArray.some(client => client.gardenId === garden.id);
  return res.send({ isAccessible: true, isOnline });
});

module.exports = router;

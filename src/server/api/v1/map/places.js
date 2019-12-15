const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models');
const PlaceService = require('../../../services/map/Place');
const MapSecurityService = require('../../../services/security/MapSecurity');
const ApiHelper = require('../../../utils/ApiHelper');


router.get('/:placeId?', (req, res) => {
  Logger.catch(async () => {
    const { placeId } = req.params;
    const places = await PlaceService.getOrList(placeId, req.query);
    return res.send(APIResponse.setData(places));
  }, { req, res });
});

router.post('/', (req, res) => {
  Logger.catch(async () => {
    const place = MapSecurityService.filterUnallowedProperties(req.body);
    const { user } = req.session;
    place.author = ApiHelper.getId(user._id);
    await MapSecurityService.onlyModAdminActivist(req, place);
    const newPlace = await PlaceService.createOrUpdate(place);
    const fulNewPlace = await PlaceService.get(newPlace._id);
    return res.send(APIResponse.setData(fulNewPlace));
  }, { req, res });
});

router.delete('/:placeId', (req, res) => {
  Logger.catch(async () => {
    const { placeId } = req.params;
    const place = await PlaceService.get(placeId);
    await MapSecurityService.onlyOwnerModAdmin(req, place);
    const deletedPlace = await PlaceService.delete(placeId);
    return res.send(APIResponse.setData(deletedPlace));
  }, { req, res });
});

module.exports = router;

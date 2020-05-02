const router = require('express').Router();
const Logger = require('../../../services/Logger');
const APIResponse = require('../../../models/api-models/APIResponse');
const PlaceService = require('../../../services/map/PlaceService');
const SessionService = require('../../../services/user/Session');
const { MarkerTypes } = require('../../../utils/Constants');
const SavedSocialService = require('../../../services/social/SavedSocialService');


router.get('/:placeId?', Logger.catch(async (req, res) => {
  const { user } = SessionService.getEntities(req);
  const { model = MarkerTypes.place } = req.query;
  const { placeId } = req.params;

  const places = await PlaceService.getOrList({ id: placeId, opts: req.query, model });

  if (user) {
    await PlaceService.appendRatingOfUser({ posts: places, user, model });
    await SavedSocialService.appendIsSavedOfUser({ posts: places, user, model });
  }

  return res.send(APIResponse.setData(places));
}));

module.exports = router;
